const { spawn } = require("child_process");
const { resolve } = require("path");
const rimraf = require("rimraf");
const { stdout } = require("single-line-log");
const chalk = require("chalk");

function build() {
  let client = spawn(`tsc`, ["--project", `${resolve(__dirname)}`], {
    encoding: "utf-8",
    stdio: ["inherit", "inherit", "inherit"]
  });

  client.on("exit", code => {
    if (code === 0) {
      stdout(chalk.green("构建成功。\n"));
    } else {
      stdout(chalk.red("构建失败！\n"));
    }
  });
}

stdout(chalk.green("正在清理...\n"));
rimraf.sync(`${resolve(__dirname, "../dist")}`);
stdout(chalk.green("正在构建...\n"));
build();
