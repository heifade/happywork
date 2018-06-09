import commander from "commander";
import { getSubCommandListInfo } from "./modules/subCommand";

const packageInfo = require("../package.json");

commander
  .command("list")
  .description("列出所有子命令")
  .action(() => {
    getSubCommandListInfo();
  });

commander
  .command("upgrade")
  .description("更新子命令")
  .action(() => {
    console.log("upgrade");
  });

commander.version(packageInfo.version, "-v, --version").command("run [name]", "运行子命令");

// 未定义子命令时提示帮忙
commander.on("command:*", function() {
  commander.help();
});

commander.parse(process.argv);

let runningCommand = commander.runningCommand;
if (runningCommand) {
  // 子命令出错时，退出
  runningCommand.on("error", () => {
    process.exit(1);
  });
  runningCommand.on("close", process.exit.bind(process));
}
