import { getWebpackConfig } from "../configs/webpackConfig";
import * as UglifyJsPlugin from "uglifyjs-webpack-plugin";
import * as OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

export async function getConfig() {
  let { webConfig, webpackConfig } = await getWebpackConfig("production");

  webpackConfig.optimization = {
    minimize: webConfig.minimize,

    minimizer: [
      new UglifyJsPlugin({
        test: [/\.js/],
        cache: true,
        parallel: true, // CPU 核数 - 1
        sourceMap: webConfig.sourceMap,
        uglifyOptions: {
          keep_classnames: false,
          keep_fnames: false,
          compress: {
            drop_console: webConfig.removeConsoleLog
          },
          output: {
            beautify: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      maxAsyncRequests: 5, // 最大的异步请求数量
      maxInitialRequests: 3, // 最大的初始化请求数量

      cacheGroups: {
        // 把node_modules中 需要同步加载的内容打包进vendor-init.js文件
        vendor_init: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "vendor-init",
          priority: 20 // 优先级
        },

        // 把非node_modules中 需要同步加载的内容打包进common-init.js文件
        common_init: {
          chunks: "initial",
          name: "common-init",
          minChunks: 2, // 最小共用数
          priority: 19 // 优先级
        }
      }
    }
    // runtimeChunk: {
    //   name: entrypoint => `runtime-${entrypoint.name}`
    // }
  };

  return { webConfig, webpackConfig };
}
