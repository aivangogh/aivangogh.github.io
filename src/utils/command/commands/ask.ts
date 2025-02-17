import { CommandUtil } from "../../../types/command";

export const ask: CommandUtil = {
  description: "Ask the user a question",
  execute: () => ({
    message: "What is your name?",
    isPrompt: true,
    onResponse: (response) => `Hello, ${response}!`,
  }),
}
