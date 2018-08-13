import { resolve } from "path";
import { renameSync } from "fs";
import { WebConfig } from "happywork-config";
import { Configuration } from "webpack";
import getWebconfig from "./webconfig";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
const tsToJs = require("../../../tools/tsToJs");
const rimraf = require("rimraf");

export async function readProjectConfig(file: string) {
  let CWD = process.cwd();
  let tempConfigFilePath = resolve(CWD, `./temp_${new Date().getTime()}`);
  let tempConfigFile = resolve(tempConfigFilePath, "webConfig.js");
  await tsToJs(file, tempConfigFilePath);

  let tempConfigFile2 = resolve(CWD, `./temp_${new Date().getTime()}.js`);
  renameSync(tempConfigFile, tempConfigFile2);

  let config = require(tempConfigFile2).default;
  rimraf.sync(tempConfigFilePath);
  rimraf.sync(tempConfigFile2);

  switch (typeof config) {
    case "function":
      return (await config()) as WebConfig;
    case "object":
    default:
      return config as WebConfig;
  }
}

export async function getWebconfigCommon() {
  let webpackConfig = await getWebconfig();

  let projConfig = await readProjectConfig(resolve(process.cwd(), "./webConfig.ts"));

  webpackConfig.devServer.port = projConfig.port;
  webpackConfig.devServer.proxy = projConfig.proxy;

  let config: Configuration = {
    ...webpackConfig,
    entry: projConfig.entry
  };

  if (projConfig.html) {
    projConfig.html.map(h => {
      config.plugins.push(
        new HtmlWebpackPlugin({
          title: h.title,
          template: h.url
        })
      );
    });
  }

  return config;
}
