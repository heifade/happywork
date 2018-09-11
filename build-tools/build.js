let webpack = require("webpack");
let webpackConfig = require("./webpack.config");
let chalk = require("chalk");

function build() {
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
      info.errors.map(e => {
        console.log(chalk.red(e));
      });
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

build();
