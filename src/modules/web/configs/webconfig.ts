import { resolve } from "path";
import { renameSync } from "fs";
import { WebConfig } from "happywork-config";
import { ifNullOrUndefined } from "../../../utils/utils";
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

  let webConfig: WebConfig;

  switch (typeof config) {
    case "function":
      webConfig = (await config()) as WebConfig;
      break;
    case "object":
    default:
      webConfig = config as WebConfig;
      break;
  }

  if (webConfig.build) {
    let build = webConfig.build;
    build.sourceMap = ifNullOrUndefined(build.sourceMap, false);
    build.minimize = ifNullOrUndefined(build.minimize, true);
    build.dropConsole = ifNullOrUndefined(build.dropConsole, false);
  } else {
    webConfig.build = {
      sourceMap: false,
      minimize: true,
      dropConsole: false
    };
  }

  return webConfig;
}
