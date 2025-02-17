import { HistoryState } from "../stores/useHistoryStore";
import { ThemeState } from "../stores/useThemeStore";

export type Command = {
	command: string;
	outputs: string[];
};

export type InteractiveResponse = {
  isPrompt: boolean;
  message: string;
  onResponse?: (response: string) => Promise<string> | string;
};

export type CommandArgs = {
	themeUtils?: Partial<ThemeState>;
	historyUtils?: Partial<HistoryState>;
};

export type ReturnCommandUtil = Promise<string | InteractiveResponse> | string | InteractiveResponse;

export type CommandUtil = {
	description: string;
	execute: (
		args: string[],
		commandArgs?: CommandArgs,
	) => ReturnCommandUtil; 
};

export type GistCommand = {
	description: string;
	content: string;
};
