const { commander } = require("../dist-core");
import { addRenameCommand } from "./modules/rename/renameCommand";
import { addCommand } from "./modules/web/index";
import { addSendFtpCommand } from "./modules/ftp/ftpCommand";

addRenameCommand();
addCommand();
addSendFtpCommand();

commander.parse(process.argv);
