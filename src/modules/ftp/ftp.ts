import { readdirSync, statSync } from "fs-extra";
import { ProgressBar } from "../../tools/progressBar";
import chalk from "chalk";
import { FtpHelper } from "./ftpHelper";

export interface FileDir {
  type: "file" | "dir";
  name: string;
  size: number;
}

export class Ftp {
  private option: any = null;
  private sendProgressBar = new ProgressBar("正在上传", 100);
  private ftpHelper: FtpHelper;

  constructor(host: string, port: number = 21, user: string, password: string) {
    this.option = { host, port, user, password, connTimeout: 600 * 1000, pasvTimeout: 600 * 1000, keepalive: 10000 };

    this.ftpHelper = new FtpHelper();
  }

  public send(path: string, ftpPath: string) {
    this.ftpHelper.connection(this.option).then(() => {
      this.sendPath(path, ftpPath)
        .then(() => {
          this.ftpHelper.end();
        })
        .catch((e: Error) => {
          this.ftpHelper.end();
          throw e;
        });
    });
  }

  private getSourceFiles(path: string, filedirList: FileDir[]) {
    let subPathList = readdirSync(path, { encoding: "utf8" });
    subPathList.map((subPath, index) => {
      subPath = `${path}/${subPath}`;
      let stat = statSync(subPath);
      if (stat.isDirectory()) {
        filedirList.push({
          type: "dir",
          name: subPath,
          size: 0
        });
        this.getSourceFiles(subPath, filedirList);
      } else {
        filedirList.push({
          type: "file",
          name: subPath,
          size: stat.size
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

  private async sendPath(path: string, ftpPath: string) {
    if (ftpPath) {
      if (!(await this.ftpHelper.checkExists(ftpPath))) {
        console.log(chalk.red(`远程目录"${ftpPath}"不存在，请先创建目录后再试！`));
        return;
      }
    }

    await this.ftpHelper.clearPath(ftpPath ? `./${ftpPath}` : ".");
    let fileList = this.getSourceFilesSync(path);
    ftpPath = ftpPath ? `${ftpPath}/` : "";

    for (let i = 0; i < fileList.length; i++) {
      let item = fileList[i];
      if (item.type === "dir") {
        await this.ftpHelper.mkdir(`${ftpPath}${item.name}`);
      } else {
        await this.ftpHelper.copyfile(`${path}/${item.name}`, `${ftpPath}${item.name}`);
        let count = 5;
        while (!(await this.ftpHelper.checkCopyFileSuccessed(item)) && count-- > 0) {
          await this.ftpHelper.copyfile(`${path}/${item.name}`, `${ftpPath}${item.name}`);
        }
      }
      this.sendProgressBar.render({ completed: i + 1, total: fileList.length });
    }
  }
}
