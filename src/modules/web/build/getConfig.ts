import { Configuration } from "webpack";
import { getWebpackConfig } from "../configs/webpackConfig";
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

export default async function(): Promise<Configuration> {
  let config = await getWebpackConfig("production");

  config.optimization = {
    minimize: true,
    namedModules: false,
    namedChunks: false,

    minimizer: [
      new UglifyJsPlugin({
        parallel: true, // CPU 核数 - 1
        sourceMap: true,
        uglifyOptions: {
          output: {
            // commons: false
            // beautify: false,
          }
        }
      })
    ],
    splitChunks: {
      chunks: "all",
      // automaticNameDelimiter: "_",
      // minSize: 30000,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: 0, // 优先级
          reuseExistingChunk: true
        },
        // 将node_modules下 异步加载的模块打包到 vendor-async.js 里
        vendor_async: {
          test: /node_modules/,
          chunks: "async",
          name: "vendor-async",
          priority: 10, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        // 将node_modules下 非异步加载的模块打包到 vendor-initial.js 里
        vendor_init: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor-initial",
          priority: 10, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        // 将 异步加载的模块打包到 commons-async.js 里
        commons_async: {
          name: "commons-async",
          chunks: "async",
          // minChunks: 2
          enforce: true // 强制执行(即使没有达到大小)
        },
        commons_init: {
          name: "commons-init",
          chunks: "initial",
          enforce: true // 强制执行(即使没有达到大小)
          // minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }
  };

  return config;
}
