import { spawn } from "child_process";

export function runCommand(command: string, args: string[]) {
  return new Promise((resolve, reject) => {
    const executedCommand = spawn(command, args, {
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
