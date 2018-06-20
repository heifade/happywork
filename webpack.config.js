const webpack = require("webpack");
const path = require("path");
const HttpWebpackPlugin = require("html-webpack-plugin");

module.exports = async function() {
  let config = {
    mode: "development",
    entry: {
      index: path.resolve(__dirname, "./src/index"),
      run: path.resolve(__dirname, "./src/run"),
      // aa: path.resolve(__dirname, "./src/aa")
    },
    target: "node",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
      extensions: [".js", ".ts", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        }
      ]
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: "async",
    //     name: true,
    //     cacheGroups: {
    //       // default: {
    //       //   minChunks: 2,
    //       //   priority: 0,  // 优先级
    //       //   reuseExistingChunk: true
    //       // },
    //       // // 将node_modules下 非异步加载的模块打包到 vendor-initial.js 里
    //       // vendor_init: {
    //       //   test: /node_modules/,
    //       //   chunks: "initial",
    //       //   name: "vendor-initial",
    //       //   priority: 10, // 优先级
    //       //   enforce: true // 强制执行(即使没有达到大小)
    //       // },
    //       // commons_init: {
    //       //   name: "commons-init",
    //       //   chunks: "initial",
    //       //   // enforce: true, // 强制执行(即使没有达到大小)
    //       //   minChunks: 2
    //       // }
    //     },
    //   },
    //   runtimeChunk: {
    //     name: entrypoint => `runtime-${entrypoint.name}`
    //   }
    // },
    // plugins: [
    //   new HttpWebpackPlugin({
    //     title: "learn webpack",
    //     filename: "index.html",
    //     //template: path.resolve(__dirname, "./public/index.html"),
    //     meta: { viewport: "width=device-width, initial-scale=1, shrink-to-fit=no" },
    //     // chunks: ["index1"],
    //     hash: true
    //   })
    // ],
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };

  return config;
};
