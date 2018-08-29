const { zipDir } = require("archive-dir");

import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";

let templates = ["web1Empty"];

templates.map(async (item: string) => {
  let sourceDir = resolve(__dirname, `../../template/${item}`);
  let targetPath = resolve(__dirname, `../template`);
  let targetZip = resolve(targetPath, `${item}.zip`);

  if (!existsSync(targetPath)) {
    mkdirSync(targetPath);
  }

  console.log(sourceDir, targetPath, targetZip);

  await zipDir(sourceDir, targetZip);
});
