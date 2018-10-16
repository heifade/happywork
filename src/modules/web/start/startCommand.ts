const { commander } = require("../../../../dist-core");
import { start } from "./webStart";

export function addStartCommand() {
  commander
    .command("webstart")
    .description("启动调试Web项目")
    .action((pars: any) => {
      start().then();
    });
}
