// 这里用到一个很实用的 npm 模块，用以在同一行打印文本
import { stdout } from "single-line-log";

// 封装的 ProgressBar 工具
export class ProgressBar {
  private description: string;
  private length: number;

  constructor(description: string, bar_length: number) {
    // 两个基本参数(属性)
    this.description = description || "Progress"; // 命令行开头的文字信息
    this.length = bar_length || 25; // 进度条的长度(单位：字符)，默认设为 25
  }

  // 刷新进度条图案、文字的方法
  render({ completed = 0, total = 100 }) {
    var percent = completed / total; // 计算进度(子任务的 完成数 除以 总数)
    var cell_num = Math.floor(percent * this.length); // 计算需要多少个 █ 符号来拼凑图案

    // 拼接黑色条
    var cell = "";
    for (var i = 0; i < cell_num; i++) {
      cell += "█";
    }

    // 拼接灰色条
    var empty = "";
    for (var i = 0; i < this.length - cell_num; i++) {
      empty += "░";
    }

    // 拼接最终文本
    var cmdText = this.description + ": " + (100 * percent).toFixed(2) + "% " + cell + empty + " " + completed + "/" + total + "\n";

    // 在单行输出文本
    stdout(cmdText);
  }
}
