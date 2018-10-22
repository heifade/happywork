import { version } from "../package.json";
import commander from "commander";

commander.version(version, "-v, --version");

commander.parse(process.argv);
