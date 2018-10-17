const { commander } = require("../dist-core");
import { addRenameCommand } from "./modules/rename/renameCommand";
import { addCommand } from "./modules/web/index";

addRenameCommand();
addCommand();

commander.parse(process.argv);
