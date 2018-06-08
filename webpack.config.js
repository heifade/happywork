const webpack = require("webpack");
const path = require("path");

module.exports = async function() {
  let config = {
    mode: "development",
    entry: {
      index: path.resolve(__dirname, "./src/index")
    },
    target: "node",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].js",

    },
    resolve: {
      extensions: [".js", ".ts", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.js/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        }
      ]
    }
  };

  return config;
};
