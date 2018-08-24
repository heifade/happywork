import { getWebpackConfig } from "../configs/webpackConfig";
import { Entry } from "webpack";
import { join } from "path";
import { getToolsModulePath } from "../../../utils/pathHelper";
import { isString, isArray } from "util";

export async function getConfig(host: string) {
  let { webConfig, webpackConfig } = await getWebpackConfig("development");

  let entry = webpackConfig.entry as Entry;

  let client = join(getToolsModulePath("webpack-dev-server"), `./client`) + `?http://${host}:${webConfig.development.port}`;

  let resultEntry: any = {};
  for (let key of Object.keys(entry)) {
    let entryValue = entry[key];
    if (isString(entryValue)) {
      resultEntry[key] = [client, entryValue];
    } else if (isArray(entryValue)) {
      resultEntry[key] = [client].concat(entryValue);
    }
  }

  webpackConfig.entry = resultEntry;

  return { webConfig, webpackConfig };
}
