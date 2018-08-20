import * as Client from "ftp";
import { readdirSync, statSync } from "fs-extra";
import { ProgressBar } from "../../tools/progressBar";

interface FileDir {
  type: "file" | "dir";
  name: string;
}

export class Ftp {
  private client = new Client();
  private option: any = null;
  private clearProgressBar = new ProgressBar("正在清理", 100);
  private sendProgressBar = new ProgressBar("正在上传", 100);

  constructor(host: string, port: number = 21, user: string, password: string) {
    this.option = { host, port, user, password };
  }

  public send(path: string) {
    this.client.on("ready", () => {
      this.sendPath(path)
        .then(() => {
          this.client.end();
        })
        .catch((e: Error) => {
          this.client.end();
          throw e;
        });
    });
    this.client.connect(this.option);
  }

  private getList(path: string): Promise<Client.ListingElement[]> {
    return new Promise((resolve, reject) => {
      this.client.list(path, (error: Error, list: Client.ListingElement[]) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(list);
      });
    });
  }

  private rmdir(path: string) {
    return new Promise((resolve, reject) => {
      this.client.rmdir(path, true, (error: Error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  private deleteFile(file: string) {
    return new Promise((resolve, reject) => {
      this.client.delete(file, (error: Error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  private getSourceFiles(path: string, filedirList: FileDir[]) {
    let subPathList = readdirSync(path, { encoding: "utf8" });
    subPathList.map((subPath, index) => {
      subPath = `${path}/${subPath}`;
      if (statSync(subPath).isDirectory()) {
        filedirList.push({
          type: "dir",
          name: subPath
        });
        this.getSourceFiles(subPath, filedirList);
      } else {
        filedirList.push({
          type: "file",
          name: subPath
        });
      }
    });
  }

  private getSourceFilesSync(path: string) {
    let files: FileDir[] = [];
    this.getSourceFiles(path, files);
    files.map((item, index) => {
      item.name = item.name.substr(path.length + 1);
    });
    return files;
  }

  private mkdir(dir: string) {
    return new Promise((resolve, reject) => {
      this.client.mkdir(dir, (error: Error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  private copyfile(sourceFile: string, targetFile: string) {
    return new Promise((resolve, reject) => {
      this.client.put(sourceFile, targetFile, (error: Error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  private async sendPath(path: string) {
    await this.clearPath(".");

    let fileList = this.getSourceFilesSync(path);
    for (let i = 0; i < fileList.length; i++) {
      let item = fileList[i];
      if (item.type === "dir") {
        await this.mkdir(item.name);
      } else {
        await this.copyfile(`${path}/${item.name}`, item.name);
      }
      this.sendProgressBar.render({ completed: i + 1, total: fileList.length });
    }
  }

  private async clearPath(path: string) {
    let list = await this.getList(path);
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      switch (item.type) {
        case "-":
          await this.deleteFile(`${path}/${item.name}`);
          break;
        case "d":
          await this.rmdir(`${path}/${item.name}`);
          break;
      }

      this.clearProgressBar.render({ completed: i + 1, total: list.length });
    }
  }
}