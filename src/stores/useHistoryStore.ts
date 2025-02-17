import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Command } from "../types/command";

export type HistoryState = {
	history: Command[];
	addHistory: (command: Command) => void;
	clearHistory: () => void;
	historyBuffer: Command[];
	addHistoryBuffer: (command: Command) => void;
	clearHistoryBuffer: () => void;
	updateLastHistoryItem: (command: Command) => void;
};

export const useHistoryStore = create<HistoryState>()(
	persist(
		(set) => ({
			history: [],
			addHistory: (command) =>
				set((state) => ({
					history: [...state.history, command],
				})),
			clearHistory: () => {
				set({ history: [] });
			},
			historyBuffer: [],
			addHistoryBuffer: (command) => {
				if (command.command !== "") {
					set((state) => ({
						historyBuffer: [...state.historyBuffer, command],
						history: [...state.history, command],
					}));
				}
			},
			clearHistoryBuffer: () => {
				set({ historyBuffer: [] });
			},
			updateLastHistoryItem: (command) =>
				set((state) => {
					const newHistoryBuffer = [...state.historyBuffer];
					const newHistory = [...state.history];

					if (newHistoryBuffer.length > 0) {
						newHistoryBuffer[newHistoryBuffer.length - 1] = command;
					}
					if (newHistory.length > 0) {
						newHistory[newHistory.length - 1] = command;
					}

					return {
						historyBuffer: newHistoryBuffer,
						history: newHistory,
					};
				}),
		}),
		{
			name: "history",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: (state) => {
				if (!state?.history) {
					state?.addHistory({
						command: "",
						outputs: [],
					});
				}
			},
			partialize: (state) => ({
				// Don't persist banner command to localStorage
				history: state.history.filter((item) => item.command !== "banner"),
			}),
		},
	),
);
