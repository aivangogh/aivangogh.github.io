import { CommandUtil } from "@/types/command";

export const date: CommandUtil = {
	description: "Show current date and time",
	execute: () => new Date().toLocaleString(),
};
