import { CommandUtil } from "../../types/command";
import { commands } from "./commands";
import { specialCommands } from "./special-commands";

export const helpCommand: Record<string, CommandUtil> = {
	help: {
		description: "Display available commands and their descriptions",
		execute: () => {
			const allCommands = { ...helpCommand, ...specialCommands, ...commands };
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
};
