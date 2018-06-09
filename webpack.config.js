const webpack = require("webpack");
const path = require("path");

module.exports = async function() {
  let config = {
    mode: "development",
    entry: {
      index: path.resolve(__dirname, "./src/index"),
      upgrade: path.resolve(__dirname, "./src/upgrade"),
    },
    target: "node",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].js"
    },
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
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };

  return config;
};
