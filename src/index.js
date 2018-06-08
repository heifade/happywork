

import commander from "commander";

commander.version();

commander.command("run [name]").action(() => {
  console.log(1, name);
}).parse(process.argv);



console.log(11, process.argv);