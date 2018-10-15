const { resolve } = require("path");

const config = {
  mode: "production",
  entry: {
    index: resolve(__dirname, "./index")
  },
  output: {
    path: resolve(__dirname, "../dist-core"),
    filename: "[name].js",
    libraryTarget: "commonjs"
  },
  target: "node",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ]
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
};

module.exports = config;
