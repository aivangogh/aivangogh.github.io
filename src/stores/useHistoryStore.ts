import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Command } from "../types/command";

type HistoryState = {
	history: Command[];
	addHistory: (command: Command[]) => void;
	clearHistory: () => void;
};

export const useHistoryStore = create<HistoryState>()(
	persist(
		(set) => ({
			history: [],
			addHistory: (command) =>
				set((state) => ({
					history: [...state.history, ...command],
				})),
			clearHistory: () => {
				set({ history: [] });
			},
		}),
		{
			name: "history",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: (state) => {
				if (!state?.history) {
					state?.addHistory([]);
				}
			},
			partialize: (state) => ({
				// Don't persist banner command to localStorage
				history: state.history.filter((item) => item.command !== "banner"),
			}),
		},
	),
);
