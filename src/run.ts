const { commander } = require("../dist-core");
import { addCommand } from "./modules/web/index";

addCommand();

commander.parse(process.argv);
