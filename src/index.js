import commander from "commander";
import colors from "colors";

const packageInfo = require("../package.json");

commander.version(packageInfo.version, "-v, --version").command("run <cmd>");

commander.command("*").action(env => {
  commander.outputHelp(redOut);
});

commander.parse(process.argv);

if (!process.argv.slice(2).length) {
  commander.outputHelp(redOut);
}

function redOut(txt) {
  return colors.red(txt);
}
