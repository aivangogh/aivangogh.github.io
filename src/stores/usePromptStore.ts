import { create } from "zustand";

type Prompt = {
	isWaiting: boolean;
	message: string;
	command: string;
	onResponse: ((response: string) => Promise<string> | string) | null;
};

export type PromptState = {
	prompt: Prompt;
	prompts: Prompt[];
	isPrompt: boolean;
	length: number;
	setPromptBoolean: (isPrompt: boolean) => void;
	setPrompt: (prompt: Prompt) => void;
	resetPrompts: () => void;
	resetPrompt: () => void;
	cancelPrompt: () => void;
};

export const usePromptStore = create<PromptState>()((set) => {
	const DEFAULT_PROMPT = {
		isWaiting: false,
		message: "",
		command: "",
		onResponse: null,
	};

	return {
		prompts: [],
		prompt: DEFAULT_PROMPT,
		isPrompt: false,
		length: 0,
		setPromptBoolean: (isPrompt) => set(() => ({ isPrompt })),
		setPrompt: (prompt) =>
			set((state) => ({
				prompt,
				prompts: [prompt],
				length: state.length + 1,
			})),
		resetPrompts: () => set(() => ({ prompts: [] })),
		resetPrompt: () =>
			set((state) => ({
				prompt: DEFAULT_PROMPT,
				isPrompt: false,
				length: state.length - 1,
			})),
		cancelPrompt: () =>
			set(() => ({
				prompt: DEFAULT_PROMPT,
				prompts: [],
				isPrompt: false,
				length: 0,
			})),
	};
});
