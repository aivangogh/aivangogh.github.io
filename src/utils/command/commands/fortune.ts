import { CommandUtil } from "../../../types/command";

export const fortune: CommandUtil = {
  description: "Display a random quote",
  execute: () => {
    const fortunes = [
      "The early bird gets the worm, but the second mouse gets the cheese.",
      "You will have a great day today!",
      "Stay hungry, stay foolish.",
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
  },
}
