import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import themes from "../../themes.json";
import { Theme } from "../types/theme";

export type ThemeState = {
	colorSchemes: Theme[];
	defaultColorScheme: string;
	currentColorScheme: string;
	terminalColorScheme: string;
	getDefaultColorScheme: () => Theme | undefined;
	setDefaultColorScheme: (theme: string) => void;
	getCurrentColorScheme: () => Theme | undefined;
	setCurrentColorScheme: (theme: string) => void;
	getTerminalColorScheme: () => Theme | undefined;
	setTerminalColorScheme: (theme: string) => void;
	getColorSchemeNames: () => string[];
	getColorSchemeByName: (themeName: string) => Theme | undefined;
	resetColorScheme: () => void;
};

const DEFAULT_THEME = "AyuDark";

const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => {
			const initialState = {
				colorSchemes: themes as Theme[],
				defaultColorScheme: DEFAULT_THEME,
				currentColorScheme: DEFAULT_THEME,
				terminalColorScheme: DEFAULT_THEME,
			};

			return {
				...initialState,
				setDefaultColorScheme: (theme: string) => {
					set({ defaultColorScheme: theme });
					if (!get().currentColorScheme) {
						set({ currentColorScheme: theme });
					}
				},

				getDefaultColorScheme: () => {
					const state = get();
					const theme = state.colorSchemes.find(
						(t) =>
							t.name.toLowerCase() === state.defaultColorScheme.toLowerCase(),
					);
					return theme;
				},

				getCurrentColorScheme: () => {
					const state = get();
					const theme = state.colorSchemes.find(
						(t) =>
							t.name.toLowerCase() === state.currentColorScheme.toLowerCase(),
					);
					return theme;
				},

				setCurrentColorScheme: (theme: string) => {
					set({ terminalColorScheme: theme, currentColorScheme: theme });
				},

				getTerminalColorScheme: () => {
					const state = get();
					const theme = state.colorSchemes.find(
						(t) =>
							t.name.toLowerCase() === state.terminalColorScheme.toLowerCase(),
					);
					return theme;
				},

				setTerminalColorScheme: (theme: string) => {
					set({
						terminalColorScheme: theme,
						currentColorScheme: DEFAULT_THEME,
					});
				},

				getColorSchemeNames: () =>
					get().colorSchemes.map((theme) => theme.name),

				getColorSchemeByName: (themeName: string) => {
					const state = get();
					const theme = state.colorSchemes.find(
						(t) => t.name.toLowerCase() === themeName.toLowerCase(),
					);
					return theme;
				},

				resetColorScheme: () => {
					set({
						currentColorScheme: get().defaultColorScheme,
						terminalColorScheme: get().defaultColorScheme,
					});
				},
			};
		},
		{
			name: "colorscheme",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage(state) {
				// If there's no currentColorScheme after rehydration, set it to default
				if (!state?.currentColorScheme) {
					state?.setCurrentColorScheme(DEFAULT_THEME);
				}
			},
		},
	),
);

export { useThemeStore };
