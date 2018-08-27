import * as Client from "ftp";
import { FileDir } from "./ftp";

export class FtpHelper {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  public async connection(option: any) {
    let promise = new Promise((resolve, reject) => {
      this.client.on("ready", () => {
        resolve(true);
      });
    });

    this.client.connect(option);
    return promise;
  }

  public getList(path: string): Promise<Client.ListingElement[]> {
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

  public async checkExists(path: string) {
    try {
      await this.getList(path);
      return true;
    } catch (e) {
      return false;
    }
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

  public mkdir(dir: string) {
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

  public copyfile(sourceFile: string, targetFile: string) {
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

  public async clearPath(path: string) {
    let list: Client.ListingElement[] = [];
    try {
      list = await this.getList(path);
    } catch {}

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
    }
  }

  public async checkCopyFileSuccessed(sourceFile: FileDir) {
    try {
      let list = await this.getList(sourceFile.name);
      if (list && list.length > 0) {
        let item = list[0];
        return item.name === sourceFile.name && Number(item.size) == sourceFile.size;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  public end() {
    this.client.end();
    this.client.destroy();
  }
}
