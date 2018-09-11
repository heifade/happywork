import * as webpack from "webpack";
import webpackConfig from "./webpack.config";

export async function build() {

  console.log(11, webpack);

  return new Promise((resolve, reject) => {
    // webpack(webpackConfig, (err, stats) => {
    //   if (err) {
    //     reject(err.stack || err);
    //     return;
    //   }
    //   const info = stats.toJson();
    //   if (stats.hasErrors()) {
    //     reject(info.errors);
    //   }
    //   if (stats.hasWarnings()) {
    //     info.warnings.map((e: any) => {
    //       console.log(e);
    //     });
    //   }
    //   const buildInfo = stats.toString({
    //     colors: true,
    //     children: true,
    //     chunks: false,
    //     modules: false,
    //     chunkModules: false,
    //     hash: false,
    //     version: false
    //   });

    //   resolve(buildInfo);
    // });
  });
}
