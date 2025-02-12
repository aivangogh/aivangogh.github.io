
const hostname = window.location.hostname;

type CommandArgs = {
	themeUtils?: {
		getColorSchemeNames: () => string[];
		getColorSchemeByName: (name: string) => any;
		setCurrentColorScheme: (name: string) => void;
	};
};

type Command = {
	description: string;
	execute: (
		args: string[],
		commandArgs?: CommandArgs,
	) => Promise<string> | string;
};

const specialCommands: Record<string, Command> = {
	help: {
		description: "Display available commands and their descriptions",
		execute: () => {
			const allCommands = { ...specialCommands, ...commands };
			return Object.entries(allCommands)
				.map(([cmd, details]) => `${cmd} - ${details.description}`)
				.join("\n");
		},
	},
	about: {
		description: "Learn more about me and my background",
		execute: () =>
			"I'm a software developer passionate about creating interactive experiences.",
	},
	projects: {
		description: "View my portfolio of projects",
		execute: () => "Here are some of my notable projects: [Your projects here]",
	},
	skills: {
		description: "See my technical skills and expertise",
		execute: () => "My skills include: TypeScript, React, Node.js, and more",
	},
	contact: {
		description: "Get my contact information",
		execute: () => "You can reach me at: [Your contact info]",
	},
	banner: {
		description: "Greet the user",
		execute: () =>
			"Welcome to my portfolio. Type 'help' for a list of commands.",
	},
};

export const commands: Record<string, Command> = {
	hostname: {
		description: "Display the current hostname",
		execute: () => hostname,
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
		execute: () => "",
	},
	exit: {
		description: "Exit the terminal",
		execute: () => "Please close the tab to exit.",
	},
	sudo: {
		description: "Attempt to run command with elevated privileges",
		execute: (args) => {
			window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
			return `Permission denied: unable to run the command '${args[0]}' as root.`;
		},
	},
	theme: {
		description: "Change the terminal theme",
		execute: (args, commandArgs) => {
			const usage = `Usage: theme [args]\n[args]:\n\tls: list all available themes\n\tset: set theme to [theme]\n[Examples]:\n\ttheme ls\n\ttheme set ayuDark`;

			if (!commandArgs?.themeUtils) {
				return "Theme system is not available.";
			}

			const {
				getColorSchemeNames,
				getColorSchemeByName,
				setCurrentColorScheme,
			} = commandArgs.themeUtils;

			if (args.length === 0) {
				return usage;
			}

			switch (args[0]) {
				case "ls": {
					let result = getColorSchemeNames().join("\n");
					// result += `\nYou can preview all these themes here: ${packageJson.repository.url}/tree/main/docs/themes`;
					return result;
				}
				case "set": {
					if (!args[1]) {
						return "Please specify a theme name. Use 'theme ls' to see available themes.";
					}

					const themeName = args[1];
					const theme = getColorSchemeByName(themeName);

					if (!theme) {
						return `Theme '${themeName}' not found. Use 'theme ls' to see available themes.`;
					}

					setCurrentColorScheme(themeName);
					return `Theme changed to ${themeName}`;
				}
				default: {
					return usage;
				}
			}
		},
	},
};

// Helper function to execute a command
export const executeCommand = (
	commandName: string,
	args: string[] = [],
	commandArgs?: CommandArgs,
): Promise<string> | string => {
	const allCommands = { ...specialCommands, ...commands };
	const command = allCommands[commandName];

	if (!command) {
		return `Command not found: ${commandName}. Type 'help' to see available commands.`;
	}

	return command.execute(args, commandArgs);
};
