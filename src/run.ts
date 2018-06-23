import * as commander from "commander";
import { addRenameCommand } from "./modules/rename/renameCommand";
import { addCommand } from "./modules/web/index"


addRenameCommand();
addCommand();



commander.parse(process.argv);
