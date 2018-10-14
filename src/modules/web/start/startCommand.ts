import { command } from "commander";
import { start } from "./webStart";

export function addStartCommand() {
  command("webstart")
    .description("启动调试Web项目")
    .action((pars: any) => {
      start().then();
    });
}
