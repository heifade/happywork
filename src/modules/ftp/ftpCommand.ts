import * as commander from "commander";
import { resolve } from "path";
import { Ftp } from "./ftp";
import { des } from "../../utils/des";
import chalk from "chalk";

function toInt(v: string) {
  return parseInt(v);
}

let key = "&Y-$%tT543)=+-#,>/';#`~c";

export function addSendFtpCommand() {
  commander
    .command("sendftp")
    .option("--path <n>", "源目录", resolve(process.cwd()))
    .option("--host <n>", "ftp地址", "")
    .option("--port <n>", "ftp端口", toInt, 21)
    .option("--ftppath <n>", "ftp目录", "")
    .option("--user <n>", "ftp用户名", "")
    .option("--password <n>", "ftp密码", "")
    .description("用指定目录覆盖ftp目录")
    .action(pars => {
      let passwordBase64 = Buffer.from(pars.password, "base64");
      let password = des.decrypt(passwordBase64, key).toString();

      let ftp = new Ftp(pars.host, pars.port, pars.user, password);

      let CWD = process.cwd();
      let path = resolve(CWD, pars.path);
      ftp.send(path);
    });

  commander
    .command("encrypt")
    .option("--text <n>", "需要加密的内容", "")
    .description("用des算法加密文本内容，并用base64编码返回")
    .action(pars => {
      let enc = des.encrypt(Buffer.from(pars.text, "utf8"), key);
      console.log(`加密结果为：${chalk.yellow(enc.toString("base64"))}`);
    });
}
