import commander from "commander";
const packageInfo = require("../package.json");

commander
  .version(packageInfo.version, "-v, --version")
  .command("run [name]", "运行子命令")
  .command("upgrade", "更新子命令")
  .command("list", "列出所有子命令");

commander.parse(process.argv);

let runningCommand = commander.runningCommand;
if (runningCommand) {
  runningCommand.on("error", () => {
    process.exit(1);
  });
  runningCommand.on("close", process.exit.bind(process));
} else {
  commander.help();
}

// 没有子命令或参数时报错
if (!process.argv.slice(2).length) {
  commander.help();
}
