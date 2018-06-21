import * as webpack from "webpack";
import * as path from "path";
// import getBabelConfig from "../babel/babel.config";
// import * as HtmlWebpackPlugin from "html-webpack-plugin";
// import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
// import { getToolsModulePath } from "../utils/getPath";
import { existsSync } from "fs";
import chalk from "chalk";

export default function() {
  return new Promise<webpack.Configuration>((resolve, reject) => {
    let modules = false;

    // let babelConfig = getBabelConfig(modules || false);
    const CWD = process.cwd();

    let config: webpack.Configuration = {
      mode: "development",
      // context: CWD,
      // entry: {
      //   index: [
      //     path.relative(__dirname, '../../webpack-dev-server/client'),
      //     path.resolve(CWD, "./src/index")
      //   ]
      // },
      output: {
        path: path.resolve(CWD, "./dist"),
        filename: "[name].[hash:8].js",
        chunkFilename: "[name].[chunkhash:8].js"
      },
      devtool: "source-map",
      resolve: {
        modules: [path.join(__dirname, "../../node_modules"), path.join(CWD, "../node_modules")],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
      },
      target: "web",
      node: ["child_process", "fs", "module", "net"].reduce((last, curr) => Object.assign({}, last, { [curr]: "empty" }), {}),
      // module: {
      //   noParse: [/jquery/],
      //   rules: [
      //     {
      //       test: /\.jsx?$/,
      //       exclude: /node_modules/,
      //       loader: getToolsModulePath("babel-loader"),
      //       options: babelConfig
      //     },
      //     {
      //       test: /\.tsx?$/,
      //       exclude: [/node_modules/],
      //       use: [
      //         {
      //           loader: getToolsModulePath("babel-loader"),
      //           options: babelConfig
      //         },
      //         // {
      //         //   options: {
      //         //     fromLoader: "ts-loader"
      //         //   }
      //         // },
      //         {
      //           loader: getToolsModulePath("ts-loader"),
      //           options: { transpileOnly: true }
      //         }
      //       ]
      //     },
      //     // {
      //     //   test: /\.tsx?$/,
      //     //   exclude: [/node_modules/],
      //     //   loader: getToolsModulePath("awesome-typescript-loader")
      //     // },
      //     {
      //       test: /\.css$/,
      //       use: [
      //         MiniCssExtractPlugin.loader,
      //         {
      //           loader: getToolsModulePath("css-loader"),
      //           options: {
      //             //modules: true
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       test: /\.less$/,
      //       exclude: /node_modules/,
      //       use: [
      //         MiniCssExtractPlugin.loader,
      //         {
      //           loader: getToolsModulePath("css-loader"),
      //           options: {
      //             modules: true
      //           }
      //         },
      //         {
      //           loader: getToolsModulePath("less-loader"),
      //           options: {}
      //         }
      //       ]
      //     },
      //     {
      //       test: /\.(woff|woff2|eot|ttf|otf|png|svg|gif|jpe?g)$/,
      //       exclude: /node_modules/,
      //       loader: getToolsModulePath("url-loader"),
      //       options: {
      //         name: "[name].[hash:8].[ext]",
      //         outputPath: "imgs/",
      //         limit: 120
      //       }
      //     }
      //     // {
      //     //   test: /\.svg$/,
      //     //   loader: getToolsModulePath("svg-inline-loader"), // 能压缩svg内容
      //     // }
      //   ]
      // },
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              chunks: "initial",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0
            },
            vendor: {
              test: /node_modules/,
              chunks: "initial",
              name: "vendor",
              priority: 10,
              enforce: true
            }
          }
        },
        runtimeChunk: false
      },

      plugins: [
        
      ],
      devServer: {
        publicPath: "/",
        proxy: {}
      },
      performance: {
        hints: "warning", // 有性能问题时输出警告
        maxAssetSize: 500 * 1024, // 最大文件的大小，单位bytes
        maxEntrypointSize: 200 * 1024, // 最大入口文件大小，单位bytes
        assetFilter: function(assetFilterName) {
          // 过滤要检查的文件
          return assetFilterName.endsWith(".css");
        }
      }
    };

    resolve(config);
  });
}