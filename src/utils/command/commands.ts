import { CommandUtil } from "../../types/command";
import { ask } from "./commands/ask";
import { clear } from "./commands/clear";
import { cowsay } from "./commands/cowsay";
import { date } from "./commands/date";
import { echo } from "./commands/echo";
import { exit } from "./commands/exit";
import { fortune } from "./commands/fortune";
import { fun } from "./commands/fun";
import { guess } from "./commands/guess";
import { history } from "./commands/history";
import { hostname } from "./commands/hostname";
import { neofetch } from "./commands/neofetch";
import { quiz } from "./commands/quiz";
import { sudo } from "./commands/sudo";
import { theme } from "./commands/theme";
import { time } from "./commands/time";
import { whoami } from "./commands/whoami";

export const commands: Record<string, CommandUtil> = {
	hostname,
	whoami,
	time,
	date,
	cowsay,
	fortune,
	quiz,
	ask,
	guess,
	fun,
  neofetch,
	echo,
	clear,
	history,
	exit,
	sudo,
	theme,
};
