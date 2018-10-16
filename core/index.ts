export { v4 as uuid } from "uuid";
export { address } from "ip";
export { sync as rm } from "rimraf";
export { stdout as singleLineLog } from "single-line-log";
import chalk from "chalk";
import ProgressBar from "progress";
import commander from "commander";

const ftp = require("basic-ftp");
const openBrowser = require("open");

export { chalk, openBrowser, ftp, ProgressBar, commander };
