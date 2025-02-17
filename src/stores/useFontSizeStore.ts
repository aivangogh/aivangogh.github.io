import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FontSizeState = {
	fontSize: number;
	setFontSize: (fontSize: number) => void;
};

export const useFontSizeStore = create<FontSizeState>()(
	persist(
		(set) => {
			return {
				fontSize: 14,
				setFontSize: (fontSize: number) => set({ fontSize }),
			};
		},
		{
			name: "fontSize",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
