import { create } from "zustand";

export type PromptState = {
	isPrompt: boolean;
	setPromptBoolean: (isPrompt: boolean) => void;
	promptMessage: string;
	setPromptMessage: (message: string) => void;
	resetPromptBoolean: () => void;
	resetPromptMessage: () => void;
};

export const useInputPromptStore = create<PromptState>()((set) => ({
	isPrompt: false,
	setPromptBoolean: (isPrompt: boolean) => set({ isPrompt }),
	promptMessage: "",
	setPromptMessage: (message: string) => set({ promptMessage: message }),
	resetPromptBoolean: () => set({ isPrompt: false }),
	resetPromptMessage: () => set({ promptMessage: "" }),
}));
