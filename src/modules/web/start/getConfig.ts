import { join, resolve } from "path";

import { getWebconfigCommon } from "../configs/webconfigCommon";
import { getToolsModulePath } from "../../../utils/pathHelper";
import { isString, isArray } from "util";

export interface Pars {
  port: number;
}

export default async function(pars: Pars) {
  let config = await getWebconfigCommon();

  let entry = config.entry as Object;

  let client = join(getToolsModulePath("webpack-dev-server"), `./client?http://localhost:${pars.port}`);

  let resultEntry: any = {};
  for (let key of Object.keys(entry)) {
    let entryValue = Reflect.get(entry, key);
    if (isString(entryValue)) {
      resultEntry[key] = [client, entryValue];
    } else if (isArray(entryValue)) {
      resultEntry[key] = [client].concat(entryValue);
    }
  }

  config.entry = resultEntry;
  config.mode = "development";

  console.log(11, config);

  return config;
}
