"use client";

import { KeyboardEvent, RefObject, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { useHistoryStore } from "../../../stores/useHistoryStore";
import { useThemeStore } from "../../../stores/useThemeStore";
import { commands } from "../../../utils/commands";

type Props = {
	className?: string;
	inputRef: RefObject<HTMLInputElement>;
};

export function Input({ className, inputRef }: Props) {
	const { history, addHistory, clearHistory } = useHistoryStore();
	let historyIndex = -1;

	const { getCurrentColorScheme } = useThemeStore();
	const currentTheme = getCurrentColorScheme();

	const [command, setCommand] = useState<string>("");

	useEffect(() => {
		inputRef.current?.focus();
	}, [command]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [command]);

	const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			// Split the command into command name and arguments
			const [commandName, ...args] = command.split(" ");

			// Execute the command
			const commandFunction = commands[commandName];

			if (!commandFunction) {
				let output = "";
				if (commandName !== "") {
					output = `${commandName} is not a valid command. Type 'help' for a list of commands.`;
				}
				const historyItem = { command, outputs: [output] };
				addHistory([historyItem]);
        setCommand("");
			}

			const output = await commandFunction(args);
			if (commandName === "clear") {
				clearHistory();
			} else {
				const historyItem = { command, outputs: [output] };
				addHistory([historyItem]); // Verify this matches your store's expected format
			}

			setCommand("");
		} else if (e.key === "ArrowUp") {
      const historyLength = history.length - 1;
			if (historyIndex < historyLength) {
				historyIndex++;
				setCommand(history[history.length - historyIndex].command);
			}
			e.preventDefault();
		} else if (e.key === "ArrowDown") {
			if (historyIndex > -1) {
				historyIndex--;
				setCommand(
					historyIndex >= 0
						? history[history.length - 1 - historyIndex].command
						: "",
				);
			}
			e.preventDefault();
		} else if (e.key === "Tab") {
			e.preventDefault();
			const autoCompleteCommand = Object.keys(commands).find((cmd) =>
				cmd.startsWith(command),
			);

			if (autoCompleteCommand) {
				setCommand(autoCompleteCommand);
			}
		} else if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
			e.preventDefault();
			clearHistory();
		}
	};

	return (
		<>
			<div className="flex w-full">
				<p className="visible md:hidden">❯</p>
				<input
					ref={inputRef}
					aria-label="Command input"
					className={cn("text-white bg-transparent outline-none", className)}
					style={{ color: currentTheme?.foreground }}
					value={command}
					onChange={(e) => setCommand(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</div>
		</>
	);
}
