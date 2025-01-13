import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import themes from "../../themes.json";
import { Theme } from "../types/theme";

type ThemeState = {
	colorSchemes: Theme[];
	defaultColorScheme: string;
	currentColorScheme: string;
	getDefaultColorScheme: () => Theme | undefined;
	setCurrentColorScheme: (theme: string) => void;
	getCurrentColorScheme: () => Theme | undefined;
	getColorSchemeNames: () => string[];
	getColorSchemeByName: (themeName: string) => Theme | undefined;
};

const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			colorSchemes: themes as Theme[],
			defaultColorScheme: "ayu",
			currentColorScheme: "ayu",
			getDefaultColorScheme: () =>
				get().colorSchemes.find(
					(theme) => theme.name === get().defaultColorScheme,
				),
			setCurrentColorScheme: (theme: string) =>
				set({ currentColorScheme: theme }),
			getCurrentColorScheme: () =>
				get().colorSchemes.find(
					(theme) => theme.name === get().currentColorScheme,
				),
			getColorSchemeNames: () => get().colorSchemes.map((theme) => theme.name),
			getColorSchemeByName: (themeName: string) =>
				get().colorSchemes.find((theme) => theme.name === themeName),
		}),
		{
			name: "colorscheme",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				if (state && !state.currentColorScheme) {
					state.setCurrentColorScheme(state.defaultColorScheme);
				}
			},
		},
	),
);

export { useThemeStore };
