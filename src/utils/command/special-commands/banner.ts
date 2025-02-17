import { CommandUtil } from "../../../types/command";

export const banner: CommandUtil = {
  description: "Greet the user",
  execute: () =>
    "Welcome to my portfolio. Type 'help' for a list of commands.",
}
