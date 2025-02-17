import { HistoryState } from "../../../stores/useHistoryStore";
import { CommandUtil } from "../../../types/command";

export const history: CommandUtil = {
	description: "Display history",
	execute: (args, commandArgs) => {
		const historyUtils = commandArgs?.historyUtils as HistoryState;

		if (args[0] === "-c") {
			return {
				message:
					"This action will irreversibly delete your command history. Are you sure? [y/N]",
				isPrompt: true,
				onResponse: (response: string) => {
					if (response.toLowerCase() === "y") {
						historyUtils.clearHistory();
						historyUtils.clearHistoryBuffer();
						return "History cleared.";
					}
					return "Operation cancelled.";
				},
			};
		} else {
			return historyUtils.history
				.map((item, index) => {
					return `${index + 1}\t${item.command}`;
				})
				.join("\n");
		}
	},
};
