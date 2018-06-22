import * as commander from "commander";
import { addRenameCommand } from "./modules/rename/renameCommand";
import { addBuildCommand } from "./modules/build/buildCommand";

addRenameCommand(commander);
addBuildCommand(commander);


commander.parse(process.argv);
