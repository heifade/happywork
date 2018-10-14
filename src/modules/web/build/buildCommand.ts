import { command } from "commander";
import { build } from "./webBuilder";

export function addBuildCommand() {
  command("webbuild")
    //.option("--step <n>", "步进", toInt, 2)
    .description("构建Web项目")
    .action(pars => {
      build().then();
    });
}
