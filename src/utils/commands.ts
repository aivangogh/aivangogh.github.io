import { CommandArgs, CommandUtil } from "../types/command";

const hostname = window.location.hostname;

const specialCommands: Record<string, CommandUtil> = {
	help: {
		description: "Display available commands and their descriptions",
		execute: () => {
			const allCommands = { ...specialCommands, ...commands };
			// Find the length of the longest command name
			const maxLength = Math.max(
				...Object.keys(allCommands).map((cmd) => cmd.length),
			);

			return Object.entries(allCommands)
				.map(([cmd, details]) => {
					// Pad the command name with spaces to align all descriptions
					const paddedCmd = cmd.padEnd(maxLength + 4); // Add 4 spaces for spacing
					return `${paddedCmd}${details.description}`;
				})
				.join("\n");
		},
	},
	about: {
		description: "Learn more about me and my background",
		execute: () =>
			"\n\tHello! I’m Ivan P.Gemota, a dedicated full- stack developer with a passion for crafting innovative and impactful digital solutions. With a solid foundation in web development, I bring expertise in a diverse array of programming languages and frameworks, enabling me to tackle complex challenges and deliver high- quality results.\n\n\tI thrive on continuous learning and am always exploring emerging technologies and best practices to refine my skills and stay ahead in the ever - evolving tech landscape.\n",
	},
	projects: {
		description: "View my portfolio of projects",
		execute: () => "Here are some of my notable projects: (to be added)",
	},
	skills: {
		description: "See my technical skills and expertise",
		execute: () =>
			"My skills include:\n\nTypeScript\nJavaScript\nReact\nNext.js\nTailwind CSS\nZustand\nNode.js\nExpress.js\nMongoDB\nPostgreSQL\nMySQL\nDizzle ORM\nPrisma ORM\nGit",
	},
	contact: {
		description: "Get my contact information",
		execute: () =>
			"You can reach me at:\n\nEmail: ivangemota23@gmail.com\nLinkedIn: https://www.linkedin.com/in/aivangogh/\nGitHub: https://github.com/aivangogh\n\nLooking forward to connecting with you!",
	},
	banner: {
		description: "Greet the user",
		execute: () =>
			"Welcome to my portfolio. Type 'help' for a list of commands.",
	},
};

export const commands: Record<string, CommandUtil> = {
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
		description: "Attempt to run command with root privileges",
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
		return `CommandUtil not found: ${commandName}. Type 'help' to see available commands.`;
	}

	return command.execute(args, commandArgs);
};
