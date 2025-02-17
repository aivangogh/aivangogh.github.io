import { HistoryState } from "../../stores/useHistoryStore";
import { ThemeState } from "../../stores/useThemeStore";
import { CommandUtil } from "../../types/command";
import { setTheme } from "./theme";

export const commands: Record<string, CommandUtil> = {
	hostname: {
		description: "Display the current hostname",
		execute: () => window.location.hostname,
	},
	whoami: {
		description: "Display current user",
		execute: () => "guest",
	},
	date: {
		description: "Show current date and time",
		execute: () => new Date().toLocaleString(),
	},
	echo: {
		description: "Print the given arguments",
		execute: (args) => args.join(" "),
	},
	clear: {
		description: "Clear the terminal screen",
		execute: ({}, commandArgs) => {
			const historyUtils = commandArgs?.historyUtils as HistoryState;

			historyUtils.clearHistoryBuffer();
			return "";
		},
	},
	history: {
		description: "Display history",
		execute: (args, commandArgs) => {
			const historyUtils = commandArgs?.historyUtils as HistoryState;

			if (args[0] === "-c") {
				return {
					message:
						"This action will irreversibly delete your command history. Are you sure? [y/N]",
					isPrompt: true,
					onResponse: (response: string) => {
						if (response.toLowerCase() === "y") {
							historyUtils.clearHistory();
							historyUtils.clearHistoryBuffer();
							return "History cleared.";
						}
						return "Operation cancelled.";
					},
				};
			} else {
				return historyUtils.history
					.map((item, index) => {
						return `${index + 1}\t${item.command}`;
					})
					.join("\n");
			}
		},
	},
	exit: {
		description: "Exit the terminal",
		execute: () => "Please close the tab to exit.",
	},
	sudo: {
		description: "Attempt to run command with root privileges",
		execute: (args) => {
			window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
			return `Permission denied: unable to run the command '${args[0]}' as root.`;
		},
	},
	theme: {
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
                console.log("TERMINAL")
								return setTheme(args[1], "terminal", themeUtils);
							}
							case "-ui":
							case "--user-interface": {
                console.log("UI")
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
	},
};
