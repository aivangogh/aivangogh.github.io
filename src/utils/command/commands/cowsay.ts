import { CommandUtil } from "../../../types/command";

export const cowsay: CommandUtil = {
	description: "Display a message with a cow",
	execute: (args) => {
		const message = args.join(" ") || "Moo!";
		return `
      ${"_".repeat(message.length + 2)}
     < ${message} >
      ${"-".repeat(message.length + 2)}
            \\   ^__^
             \\  (oo)\\_______
                (__)\\       )\\/\\
                    ||----w |
                    ||     ||
    `;
	},
};
