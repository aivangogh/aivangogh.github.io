const hostname = window.location.hostname;

type CommandFunction = (args: string[]) => Promise<string> | string;

export const commands: Record<string, CommandFunction> = {
	help: () => `Available commands: ${Object.keys(commands).join(", ")}`,
	hostname: () => hostname,
	whoami: () => "guest",
	date: () => new Date().toLocaleString(),
	echo: (args) => args.join(" "),
	clear: () => {
		return "";
	},
	exit: () => {
		return "Please close the tab to exit.";
	},
  sudo: (args) => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
};
