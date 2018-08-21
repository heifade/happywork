import { resolve } from "path";
import { renameSync } from "fs";
import { WebConfig } from "happywork-config";
const tsToJs = require("../../../tools/tsToJs");
import * as rimraf from "rimraf";

export async function getWebConfig(file: string) {
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
