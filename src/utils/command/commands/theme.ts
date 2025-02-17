import { ThemeState } from "../../../stores/useThemeStore";
import { CommandUtil } from "../../../types/command";
import { setTheme } from "./utils/set-theme";

export const theme: CommandUtil = {
	description: "Change the terminal theme",
	execute: (args, commandArgs) => {
		const usage = `Usage: theme [args]\n[args]:\n\tls: list all available themes\n\tset: set theme to [theme] [args: -t, --terminal, -ui, --user-interface]\n[Examples]:\n\ttheme ls\n\ttheme set AyuDark\n\ttheme set AyuDark -ui, theme set AyuDark --user-interface (default)\n\ttheme set AyuDark -t, theme set AyuDark --terminal`;

		if (!commandArgs?.themeUtils) {
			return "Theme system is not available.";
		}

		const themeUtils = commandArgs.themeUtils as ThemeState;

		if (args.length === 0) {
			return usage;
		}

		switch (args[0]) {
			case "ls": {
				let result = themeUtils.getColorSchemeNames().join("\n");
				// result += `\nYou can preview all these themes here: ${packageJson.repository.url}/tree/main/docs/themes`;
				return result;
			}
			case "set": {
				if (!args[1]) {
					return "Please specify a theme name. Use 'theme ls' to see available themes.";
				}

				if (args[2]) {
					switch (args[2]) {
						case "-t":
						case "--terminal": {
							console.log("TERMINAL");
							return setTheme(args[1], "terminal", themeUtils);
						}
						case "-ui":
						case "--user-interface": {
							console.log("UI");
							return setTheme(args[1], "user-interface", themeUtils);
						}
						default: {
							return "Invalid argument. Use 'themes' to see available themes and arguments.";
						}
					}
				} else {
					// Default - Terminal
					return setTheme(args[1], "user-interface", themeUtils);
				}
			}
			case "reset": {
				themeUtils.resetColorScheme();
				return `Theme reset to ${themeUtils.defaultColorScheme}`;
			}
			default: {
				return usage;
			}
		}
	},
};
