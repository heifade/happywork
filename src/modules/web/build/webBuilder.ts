import * as webpack from "webpack";
import { getConfig } from "./getConfig";
import chalk from "chalk";
import * as rimraf from "rimraf";

export async function build() {
  let { webConfig, webpackConfig } = await getConfig();

  // 删除输出目录
  if (webpackConfig.output.path) {
    rimraf.sync(webpackConfig.output.path);
  }

  // 删除构建临时目录
  // rimraf.sync(path.resolve(process.cwd(), "build-temp"));

  webpack(webpackConfig, (err, stats) => {
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
