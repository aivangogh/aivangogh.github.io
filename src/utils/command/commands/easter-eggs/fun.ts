import { CommandUtil } from "@/types/command";

export const fun: CommandUtil = {
	description: "Get a random fun fact or joke",
	execute: () => {
		const funFacts = [
			"Did you know? The first computer bug was a real moth!",
			"Why do programmers prefer dark mode? Because light attracts bugs!",
		];
		return funFacts[Math.floor(Math.random() * funFacts.length)];
	},
};
