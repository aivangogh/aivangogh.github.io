import { ReturnCommandUtil } from "../../types/command";
import { commands } from "./commands";
import { helpCommand } from "./help";
import { specialCommands } from "./special-commands";

export const allCommands = { ...helpCommand, ...specialCommands, ...commands };

// Helper function to execute a command
export const executeCommand = (
	commandName: string,
	args: string[] = [],
): ReturnCommandUtil => {
	const command = allCommands[commandName];

	if (!command) {
		return `command not found: ${commandName}. Type 'help' to see available commands.`;
	}

	return command.execute(args);
};


