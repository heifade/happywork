import * as commander from "commander";
import { resolve } from "path";

const { unzipDir } = require("archive-dir");

export function addNewCommand() {
  commander
    .command("newweb")
    .description("新建Web项目")
    .action(pars => {

      let zipFile = resolve(__dirname, "../../../template/web1Empty.zip");

      console.log(zipFile, process.cwd());



      unzipDir(zipFile, process.cwd())
      
    });
}