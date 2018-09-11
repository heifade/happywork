import { Configuration } from "webpack";
import { resolve } from "path";
import { cwd } from "process";

let tempWebConfigPath = resolve(cwd(), `./temp_${new Date().getTime()}`);

export default {
  mode: "development",
  entry: {
    webConfig: resolve(cwd(), "./webConfig")
  },
  output: {
    path: tempWebConfigPath,
    filename: "[name].js"
  },
  target: "node",
  resolve: {
    extensions: [".ts", ".js", ".json"],
    modules: [resolve(cwd(), "./node_modules")]
  },
  module: {
    noParse: [/[\\/]node_modules[\\/]webpack[\\/]/],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ]
      }
    ]
  }
} as Configuration;
