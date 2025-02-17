import { CommandUtil } from "../../types/command";
import { ask } from "./commands/easter-eggs/ask";
import { clear } from "./commands/clear";
import { cowsay } from "./commands/easter-eggs/cowsay";
import { date } from "./commands/date";
import { echo } from "./commands/echo";
import { exit } from "./commands/exit";
import { fortune } from "./commands/easter-eggs/fortune";
import { fun } from "./commands/easter-eggs/fun";
import { guess } from "./commands/easter-eggs/guess";
import { history } from "./commands/history";
import { hostname } from "./commands/hostname";
import { neofetch } from "./commands/easter-eggs/neofetch";
import { quiz } from "./commands/easter-eggs/quiz";
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
