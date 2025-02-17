import { CommandUtil } from "../../../types/command";

export const exit: CommandUtil = {
	description: "Exit the terminal",
	execute: () => "Please close the tab to exit.",
};
