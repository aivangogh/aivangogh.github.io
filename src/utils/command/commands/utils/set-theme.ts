import { ThemeState } from "@/stores/useThemeStore";

type CurrentColorScheme = Pick<
	ThemeState,
	"getCurrentColorScheme" | "setCurrentColorScheme"
>;
type TerminalColorScheme = Pick<
	ThemeState,
	"getTerminalColorScheme" | "setTerminalColorScheme"
>;

type ThemeUtils = (Pick<ThemeState, "getColorSchemeByName"> &
	CurrentColorScheme) &
	TerminalColorScheme;

type ThemeFor = "terminal" | "user-interface";

export function setTheme(
	themeName: string,
	themeFor: ThemeFor,
	themeUtils: ThemeUtils,
): string {
	const theme = themeUtils.getColorSchemeByName(themeName);

	if (!theme) {
		return `Theme '${themeName}' not found. Use 'theme ls' to see available themes.`;
	}

	if (themeFor === "terminal") {
		themeUtils.setTerminalColorScheme(themeName);
	}

	if (themeFor === "user-interface") {
		themeUtils.setCurrentColorScheme(themeName);
	}

	return `Theme changed to ${themeName}`;
}
