const { spawn } = require("child_process");
const { resolve } = require("path");
const rimraf = require("rimraf");
const { stdout } = require("single-line-log");
const chalk = require("chalk");
const webpack = require("webpack");

function build() {
  let client = spawn(`tsc`, ["--project", `${resolve(__dirname)}`], {
    encoding: "utf-8",
    stdio: ["inherit", "inherit", "inherit"],
    shell: true
  });

  client.on("exit", code => {
    if (code === 0) {
      stdout(chalk.green("构建成功。\n"));
    } else {
      stdout(chalk.red("构建失败！\n"));
    }
  });
}

function buildCore() {
  const config = require(resolve(__dirname, "../core/webpackConfig.js"));
  webpack(config, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      process.exit(1);
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      info.errors.map(e => {
        console.log(chalk.red(e));
      });
      process.exit(1);
    }
    if (stats.hasWarnings()) {
      info.warnings.map(e => {
        console.log(chalk.yellow(e));
      });
    }
    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false
    });
    console.log(buildInfo);
  });
}

stdout(chalk.green("正在清理dist-core...\n"));
rimraf.sync(`${resolve(__dirname, "../dist-core")}`);
stdout(chalk.green("正在构建dist-core...\n"));
buildCore();

stdout(chalk.green("正在清理dist...\n"));
rimraf.sync(`${resolve(__dirname, "../dist")}`);
stdout(chalk.green("正在构建...\n"));
build();
