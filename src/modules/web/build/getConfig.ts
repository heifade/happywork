import { Configuration } from "webpack";
import { resolve } from "path";

import { getWebconfigCommon } from "../configs/webconfigCommon";

export default async function() {
  let newConfig = getWebconfigCommon();

  return newConfig;
}
