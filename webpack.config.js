const webpack = require('webpack');
const path = require("path");

module.exports = async function () {
  let config = {
    mode: 'development',
    entry: {
      index: path.relative(__dirname, "./src/index"),
    },
    output: {
      path: path.relative(__dirname, "./dist"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.js/,
          use: [
            {
              loader: "babel-loader",
            }
          ]
        }
      ]
    }
  }

  return config;
}