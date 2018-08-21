import { getWebpackConfig } from "../configs/webpackConfig";
import * as UglifyJsPlugin from "uglifyjs-webpack-plugin";
import * as OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

export async function getConfig() {
  let { webConfig, webpackConfig } = await getWebpackConfig("production");

  webpackConfig.optimization = {
    minimize: true,
    namedModules: false,
    namedChunks: false,

    minimizer: [
      new UglifyJsPlugin({
        test: [/\.js/],
        cache: true,
        parallel: true, // CPU 核数 - 1
        sourceMap: webConfig.sourceMap,
        uglifyOptions: {
          output: {
            // commons: false
            // beautify: false,
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: "all",
      // automaticNameDelimiter: "_",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5, // 最大的异步请求数量
      maxInitialRequests: 3, // 最大的实始化请求数量
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
          minChunks: 1
          // enforce: true // 强制执行(即使没有达到大小)
        },
        // 将node_modules下 非异步加载的模块打包到 vendor-initial.js 里
        vendor_init: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor-initial",
          priority: 10, // 优先级
          minChunks: 1
          // enforce: true // 强制执行(即使没有达到大小)
        },
        // 将 异步加载的模块打包到 commons-async.js 里
        commons_async: {
          name: "commons-async",
          chunks: "async",
          minChunks: 1
          // enforce: true // 强制执行(即使没有达到大小)
        },
        commons_init: {
          name: "commons-init",
          chunks: "initial",
          minChunks: 1
          // enforce: true // 强制执行(即使没有达到大小)
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }
  };

  return { webConfig, webpackConfig };
}
