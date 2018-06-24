import * as webpack from "webpack";
import getConfig from "./getConfig";
import chalk from "chalk";
const rimraf = require("rimraf");

export async function build() {
  let config = await getConfig();


  // 删除输出目录
  if (config.output.path) {
    rimraf.sync(config.output.path);
  }

  //console.log(config);

  // 删除构建临时目录
  // rimraf.sync(path.resolve(process.cwd(), "build-temp"));

  webpack(config, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      // if (err.details) {
      //   console.error(err.details);
      // }
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      info.errors.map((e: string) => {
        console.log(chalk.red(e));
      });
    }
    if (stats.hasWarnings()) {
      info.warnings.map((e: string) => {
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