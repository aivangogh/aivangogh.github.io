import { HistoryState } from "../../../stores/useHistoryStore";
import { CommandUtil } from "../../../types/command";

export const clear: CommandUtil = {
	description: "Clear the terminal screen",
	execute: ({}, commandArgs) => {
		const historyUtils = commandArgs?.historyUtils as HistoryState;

		historyUtils.clearHistoryBuffer();
		return "";
	},
};
