
export type Command = {
	command: string;
	outputs: string[];
};

export type InteractiveResponse = {
	isPrompt: boolean;
	message: string;
	onResponse?: (response: string) => Promise<string> | string;
};

export type ReturnCommandUtil =
	| Promise<string | InteractiveResponse>
	| string
	| InteractiveResponse;

export type CommandUtil = {
	description: string;
	execute: (args: string[]) => ReturnCommandUtil;
};

export type GistCommand = {
	description: string;
	content: string;
};
