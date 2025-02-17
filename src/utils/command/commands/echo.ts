import { CommandUtil } from "../../../types/command";

export const echo: CommandUtil = {
  description: "Print the given arguments",
  execute: (args) => args.join(" "),
}

