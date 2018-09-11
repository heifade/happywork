let { resolve } = require("path");
let getBabelConfig = require("./babel.config");
let babelConfig = getBabelConfig(false);

module.exports = {
  mode: "development",
  entry: {
    index: resolve(__dirname, "../src/index"),
    run: resolve(__dirname, "../src/run")
  },
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  target: "node",
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  externals: {
    bindings: 'require("bindings")'
  },
  module: {
    noParse: [
      /[\\/]node_modules[\\/]webpack[\\/]/,
      /[\\/]node_modules[\\/]dynamic-load-js[\\/]/,
      /[\\/]node_modules[\\/]mini-css-extract-plugin[\\/]/,
      /[\\/]node_modules[\\/]html-webpack-plugin[\\/]/,
      /[\\/]node_modules[\\/]uglifyjs-webpack-plugin[\\/]/,
      /[\\/]node_modules[\\/]optimize-css-assets-webpack-plugin[\\/]/,
    ],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: babelConfig
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: babelConfig
          },
          {
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ]
      }
    ]
  }
};
