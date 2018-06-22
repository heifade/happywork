import { CommanderStatic } from "commander";
import { build } from "./webBuilder";

export function addBuildCommand(commander: CommanderStatic) {
  commander
    .command("webbuild")
    //.option("--step <n>", "步进", toInt, 2)
    .description("构建Web项目")
    .action(pars => {
      build().then();
    });
}