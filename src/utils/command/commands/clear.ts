import { useHistoryStore } from "@/stores/useHistoryStore";
import { CommandUtil } from "@/types/command";

export const clear: CommandUtil = {
	description: "Clear the terminal screen",
	execute: ({}) => {
		const historyUtils = useHistoryStore.getState();

		historyUtils.clearHistoryBuffer();
		return "";
	},
};
