import { pad, padEnd } from "lodash";

export const subCommandList = [{ command: "create", des: "创建项目" }, { command: "build", des: "构建项目" }];

export function getSubCommandListInfo() {
  console.log();
  console.log("子命令列表：");
  subCommandList.map(c => {
    console.log(pad("", 5), padEnd(c.command, 20), c.des);
  });
}
