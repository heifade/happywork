import { resolve as resolvePath } from "path";
import * as rimraf from "rimraf";

import { spawn } from "child_process";
import { WebConfig } from "happywork-config";
import { ifNullOrUndefined } from "../../../utils/utils";

export async function getWebConfig(file: string) {
  return new Promise<WebConfig>((resolve, reject) => {
    let CWD = process.cwd();

    let webConfigTs = resolvePath(CWD, "./webConfig.ts");
    let tempConfigFile = resolvePath(CWD, `./webConfig.js`);

    let client = spawn(`tsc`, [webConfigTs, "--module", "commonjs"]);

    client.on("exit", code => {
      if (code === 0) {
        readConfig(tempConfigFile).then(webConfig => {
          resolve(webConfig);
          rimraf.sync(tempConfigFile);
        });
      } else {
        reject();
      }
    });
  });
}

async function readConfig(tempConfigFile: string) {
  let CWD = process.cwd();
  let webConfigTs = resolvePath(CWD, tempConfigFile);
  let config = require(webConfigTs).default;

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
    let { build } = webConfig;
    build.sourceMap = ifNullOrUndefined(build.sourceMap, false);
    build.minimize = ifNullOrUndefined(build.minimize, true);
    build.dropConsole = ifNullOrUndefined(build.dropConsole, false);
    build.optimization = ifNullOrUndefined(build.optimization, {
      splitChunks: {
        cacheGroups: {}
      }
    });
  } else {
    webConfig.build = {
      sourceMap: false,
      minimize: true,
      dropConsole: false,
      optimization: {
        splitChunks: {
          cacheGroups: {}
        }
      }
    };
  }

  if (webConfig.development) {
    let { development } = webConfig;
    development.port = ifNullOrUndefined(development.port, 8080);
  } else {
    webConfig.development = { port: 8080 };
  }

  return webConfig;
}
