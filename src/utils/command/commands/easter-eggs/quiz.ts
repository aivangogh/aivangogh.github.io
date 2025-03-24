import { CommandUtil } from "@/types/command";

export const quiz: CommandUtil = {
	description: "Start a quiz game",
	execute: () => ({
		message: "What is the capital of France?",
		isPrompt: true,
		onResponse: (response) =>
			response.toLowerCase() === "paris"
				? "Correct!"
				: "Incorrect. The answer is Paris.",
	}),
};
