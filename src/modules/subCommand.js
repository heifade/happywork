import { pad, padEnd } from "lodash";
import { runCommand } from "./runCommand";

export const subCommandList = [{ command: "create", des: "创建项目" }, { command: "build", des: "构建项目" }, {command: "renameFiles", des: "重命名目录下的文件"}];

export function getSubCommandListInfo() {
  console.log();
  console.log("子命令列表：");
  subCommandList.map(c => {
    console.log(pad("", 5), padEnd(c.command, 20), c.des);
  });
}


export function upgradeSubCommand() {
  runCommand('','')
}