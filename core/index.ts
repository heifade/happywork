import { v4 as uuid } from "uuid";
import { address } from "ip";
import chalk from "chalk";
import { sync as rm } from "rimraf";
import { stdout as singleLineLog } from "single-line-log";
import * as ProgressBar from "progress";

const ftp = require("basic-ftp");
const openBrowser = require("open");





export { uuid, chalk, address, openBrowser, rm, ftp,  singleLineLog, ProgressBar };