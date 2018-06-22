import { Configuration } from "webpack";
import { resolve } from "path";
import { WebConfig } from "happywork-config";
const tsToJs = require("../../tools/tsToJs");
const rimraf = require("rimraf");

async function readProjectConfig(file: string) {
  let CWD = process.cwd();
  let tempConfigFilePath = resolve(CWD, `./temp_${new Date().getTime()}`);
  let tempConfigFile = resolve(tempConfigFilePath, "webConfig.js");
  await tsToJs(file, tempConfigFilePath);
  let config = require(tempConfigFile);
  rimraf.sync(tempConfigFilePath);

  switch (typeof config) {
    case "function":
      return (await config()) as WebConfig;
    case "object":
    default:
      return config as WebConfig;
  }
}

export default async function(config: Configuration) {
  let projConfig = await readProjectConfig(resolve(process.cwd(), "./webConfig.ts"));

  let newConfig: Configuration = {
    ...config,
    entry: projConfig.entry
  };

  return newConfig;
}
