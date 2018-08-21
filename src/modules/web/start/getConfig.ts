import { Configuration, Entry } from "webpack";
import { join } from "path";
import { getWebpackConfig } from "../configs/webpackConfig";
import { getToolsModulePath } from "../../../utils/pathHelper";
import { isString, isArray } from "util";

export interface Pars {
  host: string;
}

export default async function(pars: Pars): Promise<Configuration> {
  let config = await getWebpackConfig("development");

  let entry = config.entry as Entry;

  let client = join(getToolsModulePath("webpack-dev-server"), `./client`) + `?http://${pars.host}:${config.devServer.port}`;

  let resultEntry: any = {};
  for (let key of Object.keys(entry)) {
    let entryValue = entry[key];
    if (isString(entryValue)) {
      resultEntry[key] = [client, entryValue];
    } else if (isArray(entryValue)) {
      resultEntry[key] = [client].concat(entryValue);
    }
  }

  config.entry = resultEntry;

  return config;
}
