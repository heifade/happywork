import * as commander from "commander";
import { start } from "./webStart";

export function addStartCommand() {
  commander
    .command("webstart")
    .description("启动调试Web项目")
    .action(pars => {
      start().then();
    });
}
