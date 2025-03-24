import { create } from "zustand";

type ToggleTitleBarActionState = {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
};

export const useToggleTitleBarActionsStore =
	create<ToggleTitleBarActionState>()(
		(set) => {
			return {
        isFullScreen: false,
        toggleFullScreen: () => set((state) => ({ isFullScreen: !state.isFullScreen }))
			};
		},
	);
