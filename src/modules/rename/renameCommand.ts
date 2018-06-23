import * as commander from "commander";
import { resolve, join, extname, dirname } from "path";
import { readdirSync, lstatSync, renameSync } from "fs";
import { padStart } from "lodash";
import { v4 as uuid } from "uuid";
import * as ProgressBar from "progress";

function toInt(v: string) {
  return parseInt(v);
}

export function addRenameCommand() {
  commander
    .command("rename")
    .option("--prefix <n>", "文件名开头", "P")
    .option("--length <n>", "数字位数", toInt, 3)
    .option("--path <n>", "目录，默认为当前目录", resolve(process.cwd()))
    .option("--skip <n>", "跳过前面几个文件", toInt, 0)
    .option("--start <n>", "开始序号", toInt, 1)
    .option("--step <n>", "步进", toInt, 2)
    .description("重命名指定目录下面的所有文件名称。按创建时间先后顺序，以序号命名")
    .action(pars => {
      let prefix = pars.prefix;
      let length = pars.length;
      let pathName = pars.path;
      let skip = pars.skip;
      let start = pars.start;
      let step = pars.step;

      let fileList: { fileFullName: string; lastWriteTime: number }[] = [];
      readdirSync(pathName).map(file => {
        let fileFullName = join(pathName, file);
        let stat = lstatSync(fileFullName);

        fileList.push({
          fileFullName: fileFullName,
          lastWriteTime: stat.mtimeMs
        });
      });

      fileList = fileList.sort((v1, v2) => v1.lastWriteTime - v2.lastWriteTime);

      // 先将文件名全改成 GUID 防止文件名称相同
      fileList.map((file, i) => {
        if (i >= skip) {
          let newFileName = `${dirname(file.fileFullName)}/${uuid()}${extname(file.fileFullName)}`;
          renameSync(file.fileFullName, newFileName);
          file.fileFullName = newFileName;
        }
      });

      const progressBar = new ProgressBar("处理进度[:bar]进度值:percent 用时:etas", {
        complete: "=",
        incomplete: "-",
        width: 100,
        total: fileList.length - skip
      });

      let count = 0;
      // 更新文件名
      fileList.map((file, i, array) => {
        if (i >= skip) {
          let no = start + (i - skip) * step;
          let newFileName = join(dirname(file.fileFullName), `${prefix}${padStart(no, length, "0")}${extname(file.fileFullName)}`);

          renameSync(file.fileFullName, newFileName);

          progressBar.tick();
          count++;
        }
      });

      console.log(`\n完成，共处理文件数：${count}，跳过：${skip}`);
    });
}
