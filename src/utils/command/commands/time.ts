import { CommandUtil } from "@/types/command";

export const time: CommandUtil = {
	description: "Display the current time",
  execute: () => new Date().toLocaleTimeString(),
};
