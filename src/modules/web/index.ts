import { addBuildCommand } from "./build/buildCommand";
import { addStartCommand } from "./start/startCommand";

export function addCommand() {
  addBuildCommand();
  // addStartCommand();
}
