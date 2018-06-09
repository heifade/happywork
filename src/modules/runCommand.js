import child_process from "child_process";

export function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const executedCommand = child_process.spawn(command, args, {
      stdio: "inherit",
      shell: true
    });

    executedCommand.on("error", error => {
      reject(error);
    });

    executedCommand.on("exit", code => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}
