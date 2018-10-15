import { resolve } from "path";
import { des } from "../../utils/des";
import { upload } from "./ftpUpload";

const { chalk, commander } = require("../../../dist-core")

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
    .action((pars: any) => {
      let passwordBase64 = Buffer.from(pars.password, "base64");
      let password = des.decrypt(passwordBase64, key).toString();

      let CWD = process.cwd();
      let sourcePath = resolve(CWD, pars.path);

      upload({ host: pars.host, user: pars.user, password, sourcePath, ftpPath: pars.ftppath })
        .then(() => {})
        .catch(e => {});
    });

  commander
    .command("encrypt")
    .option("--text <n>", `需要加密的内容。${chalk.red("注意：如有特殊字符，需要用单引号括起来，如：'123!56'")}`, "")
    .description("用des算法加密文本内容，并用base64编码返回")
    .action((pars: any) => {
      let enc = des.encrypt(Buffer.from(pars.text, "utf8"), key);
      console.log(`加密结果为：${chalk.yellow(enc.toString("base64"))}`);
    });
}
