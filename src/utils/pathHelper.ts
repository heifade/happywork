
import { resolve } from "path";

// 根据module名称，获取pappywork引用的module目录
export function getToolsModulePath(source: string) {
  let url = require.resolve(source);
  url = url.substr(0, url.lastIndexOf(source) + source.length);
  // console.log(url);

  return url;
}

// 根据module名称，获取工程引用的module目录
export function getWorkModulePath(source: string) {
  let url = require.resolve(source, { paths: [process.cwd()] });
  return url;
}