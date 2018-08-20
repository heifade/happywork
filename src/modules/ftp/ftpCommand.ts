import * as commander from "commander";
import { resolve } from "path";
import { Ftp } from "./ftp";

function toInt(v: string) {
  return parseInt(v);
}

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
      let password = (new Buffer(pars.password, "base64")).toString().substr(9);
      let ftp = new Ftp(pars.host, 21, pars.user, password);
      ftp.send(pars.path);
    });
}


// // 加密密码
// let password = "123456";
// let time = (new Date()).getTime().toString();
// time = time.substr(time.length - 9);
// let b = new Buffer(time + password);
// let s = b.toString('base64');
// console.log(s);

