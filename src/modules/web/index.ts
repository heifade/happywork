import { addBuildCommand } from "./build/buildCommand";
import { addStartCommand } from "./start/startCommand";
import { addNewCommand } from "./new/newCommand";

export function addCommand() {
  addBuildCommand();
  addStartCommand();
  addNewCommand();
}
