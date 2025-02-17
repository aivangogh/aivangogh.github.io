import { CommandUtil } from "../../types/command";
import { about } from "./special-commands/about";
import { banner } from "./special-commands/banner";
import { contact } from "./special-commands/contact";
import { projects } from "./special-commands/projects";
import { skills } from "./special-commands/skills";

export const specialCommands: Record<string, CommandUtil> = {
	about,
	projects,
	skills,
	contact,
	banner,
};
