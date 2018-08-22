import { Configuration, NamedModulesPlugin, HotModuleReplacementPlugin, ContextReplacementPlugin } from "webpack";
import { resolve, join } from "path";
import { getToolsModulePath } from "../../../utils/pathHelper";
import { getBabelConfig } from "./babel/babel.config";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { getWebConfig } from "./webConfig";
import { WebConfig } from "happywork-config";

interface ReturnData {
  webpackConfig: Configuration;
  webConfig: WebConfig;
}

export async function getWebpackConfig(mode: "development" | "production"): Promise<ReturnData> {
  let webConfig = await getWebConfig(resolve(process.cwd(), "./webConfig.ts"));

  let babelConfig = getBabelConfig(false);
  const CWD = process.cwd();

  let config: Configuration = {
    mode: mode,
    entry: webConfig.entry,
    output: {
      path: resolve(CWD, "./dist"),
      filename: "[name].[hash:8].js",
      chunkFilename: "[name].[chunkhash:8].js"
    },
    devtool: webConfig.sourceMap ? "source-map" : undefined,
    resolve: {
      modules: [join(__dirname, "../../../../node_modules"), join(CWD, "./node_modules")],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    target: "web",
    node: ["child_process", "fs", "module", "net"].reduce((last, curr) => Object.assign({}, last, { [curr]: "empty" }), {}),
    module: {
      noParse: [/jquery/],
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: getToolsModulePath("babel-loader"),
          options: babelConfig
        },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: getToolsModulePath("babel-loader"),
              options: babelConfig
            },
            {
              loader: getToolsModulePath("ts-loader"),
              options: { transpileOnly: true }
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: getToolsModulePath("css-loader"),
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: getToolsModulePath("css-loader"),
              options: {
                // modules: true
              }
            }
          ]
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: getToolsModulePath("css-loader"),
              options: {
                modules: true
              }
            },
            {
              loader: getToolsModulePath("less-loader"),
              options: {}
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|png|svg|gif|jpe?g)$/,
          exclude: /node_modules/,
          loader: getToolsModulePath("url-loader"),
          options: {
            name: "[name].[hash:8].[ext]",
            outputPath: "imgs/",
            limit: 120
          }
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].css",
        chunkFilename: "[id].[chunkhash:8].css"
      }),
      new NamedModulesPlugin(),
      new HotModuleReplacementPlugin(),
      ...webConfig.html.map(
        (item: any, index: number) =>
          new HtmlWebpackPlugin({
            filename: item.filename,
            title: item.title,
            template: item.template,
            chunks: item.chunks
          })
      ),
      new ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-nz/)
    ],
    performance: {
      hints: "warning", // 有性能问题时输出警告
      maxAssetSize: 500 * 1024, // 最大文件的大小，单位bytes
      maxEntrypointSize: 1500 * 1024, // 最大入口文件大小，单位bytes
      assetFilter: function(assetFilterName) {
        return true;
      }
    }
  };

  return {
    webConfig: webConfig,
    webpackConfig: config
  };
}
