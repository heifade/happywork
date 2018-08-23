import { getWebpackConfig } from "../configs/webpackConfig";
import * as UglifyJsPlugin from "uglifyjs-webpack-plugin";
import * as OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

export async function getConfig() {
  let { webConfig, webpackConfig } = await getWebpackConfig("production");

  webpackConfig.optimization = {
    minimize: webConfig.minimize,
    namedModules: false,
    namedChunks: false,
    // removeAvailableModules: true,
    // removeEmptyChunks: true,
    // mergeDuplicateChunks: true,
    // occurrenceOrder: true,

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
            drop_console: true
          },
          output: {
            beautify: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: "all",
      // minSize: 30000,
      // minChunks: 1,
      // maxAsyncRequests: 5, // 最大的异步请求数量
      // maxInitialRequests: 5, // 最大的初始化请求数量
      name: true,
      cacheGroups: {
        // 将node_modules下 异步加载的模块打包到这里
        vendor_async: {
          test: /node_modules/,
          chunks: "async",
          name: "vendor-async",
          priority: 6, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        // 将 异步加载的模块打包到这里
        commons_async: {
          chunks: "async",
          name: "commons-async",
          priority: 6, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        // 将node_modules下 非异步加载的模块打包到这里
        vendor_react: {
          test: /node_modules[\/\\](react)/,
          chunks: "initial",
          name: "vendor-react",
          priority: 5, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        // 将node_modules下 非异步加载的模块打包到这里
        vendor_antd: {
          test: /node_modules[\/\\](antd)/,
          chunks: "initial",
          name: "vendor-antd",
          priority: 5, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        // 将node_modules下 非异步加载的模块打包到这里
        vendor_rc1: {
          test: /node_modules[\/\\](rc-calendar|rc-form|rc-pagination|rc-table|rc-select)/,
          chunks: "initial",
          name: "vendor-rc1",
          priority: 5, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        // 将node_modules下 非异步加载的模块打包到这里
        vendor_rc2: {
          test: /node_modules[\/\\](rc)/,
          chunks: "initial",
          name: "vendor-rc2",
          priority: 4, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        // 将node_modules下 非异步加载的模块打包到这里
        vendor_moment_lodash: {
          test: /node_modules[\/\\](moment|lodash)/,
          chunks: "initial",
          name: "vendor-moment-lodash",
          priority: 4, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        // 将node_modules下 非异步加载的模块打包到这里
        vendor_init: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor-init",
          priority: 3, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        commons_init: {
          chunks: "initial",
          name: "commons-init",
          priority: 2, // 优先级
          enforce: true // 强制执行(即使没有达到大小)
        },
        default: {
          priority: 1, // 优先级
          reuseExistingChunk: true
        }
      }
    }
    // runtimeChunk: {
    //   name: entrypoint => `runtime-${entrypoint.name}`
    // }
  };

  return { webConfig, webpackConfig };
}
