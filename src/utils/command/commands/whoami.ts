import { CommandUtil } from "@/types/command";

export const whoami: CommandUtil = {
	description: "Display current user",
	execute: () => "guest",
};
