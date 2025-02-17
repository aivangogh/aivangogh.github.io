import { CommandUtil } from "../../../types/command";

export const hostname: CommandUtil = {
	description: "Display the current hostname",
	execute: () => window.location.hostname,
};
