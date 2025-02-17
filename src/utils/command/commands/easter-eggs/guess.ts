import { CommandUtil } from "../../../../types/command";

export const guess: CommandUtil = {
  description: "Guess a number between 1 and 100",
  execute: () => {
    const number = Math.floor(Math.random() * 100) + 1;
    return {
      message: "Guess a number between 1 and 100",
      isPrompt: true,
      onResponse: (response) => {
        const guess = parseInt(response);
        if (isNaN(guess)) return "Please enter a valid number.";
        if (guess === number) return "Correct!";
        return guess < number ? "Too low!" : "Too high!";
      },
    };
  },
}
