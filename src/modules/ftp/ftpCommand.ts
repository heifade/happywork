import * as commander from "commander";
import { resolve } from "path";
// import { Ftp } from "./ftp";
import { des } from "../../utils/des";
import chalk from "chalk";
let ftp = require("basic-ftp");

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
      pars.password = des.decrypt(passwordBase64, key).toString();

      let CWD = process.cwd();
      pars.path = resolve(CWD, pars.path);

      uploadDir(pars)
        .then(() => {
          console.log(chalk.green("上传完成!"));
        })
        .catch(e => {
          console.log(chalk.red("上传失败"), e);
        });
    });

  commander
    .command("encrypt")
    .option("--text <n>", `需要加密的内容。${chalk.red("注意：如有特殊字符，需要用单引号括起来，如：'123!56'")}`, "")
    .description("用des算法加密文本内容，并用base64编码返回")
    .action(pars => {
      let enc = des.encrypt(Buffer.from(pars.text, "utf8"), key);
      console.log(`加密结果为：${chalk.yellow(enc.toString("base64"))}`);
    });
}

async function uploadDir(pars: any) {
  let client = new ftp.Client(600 * 1000);
  await client.access({
    host: pars.host,
    user: pars.user,
    password: pars.password,
    secure: false
  });

  client.trackProgress((info: any) => {
    console.log(info.name, info.type, info.bytes, info.bytesOverall);
  });

  await client.ensureDir(pars.ftppath);
  await client.clearWorkingDir();
  await client.uploadDir(pars.path);

  client.trackProgress();

  await client.close();
}
