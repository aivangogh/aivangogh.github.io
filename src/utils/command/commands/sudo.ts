import { CommandUtil } from "@/types/command";

export const sudo: CommandUtil = {
  description: "Attempt to run command with root privileges",
  execute: (args) => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
}
