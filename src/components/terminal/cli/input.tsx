"use client";

import { KeyboardEvent, RefObject, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { useHistoryStore } from "../../../stores/useHistoryStore";
import { useThemeStore } from "../../../stores/useThemeStore";
import { commands, executeCommand } from "../../../utils/commands";

type Props = {
	className?: string;
	inputRef: RefObject<HTMLInputElement>;
};

export function Input({ className, inputRef }: Props) {
	const { history, addHistory, clearHistory } = useHistoryStore();
	const [historyIndex, setHistoryIndex] = useState(-1);

	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());
	const { getColorSchemeNames, getColorSchemeByName, setCurrentColorScheme } =
		useThemeStore();
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [command, setCommand] = useState<string>("");

	useEffect(() => {
		const executeBanner = async () => {
			if (isInitialLoad) {
				const output = await executeCommand("banner", []);
				const historyItem = { command: "banner", outputs: [output] };
				addHistory([historyItem]);
				setIsInitialLoad(false);
			}
		};
		executeBanner();
	}, []);

	useEffect(() => {
		inputRef.current?.focus();
	}, [command]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [command]);

	const handleCommand = async (commandStr: string) => {
		const trimmedCommand = commandStr.trim();
		const [commandName, ...args] = trimmedCommand.split(" ");

		const output = await executeCommand(commandName, args, {
			themeUtils: {
				getColorSchemeNames,
				getColorSchemeByName,
				setCurrentColorScheme,
			},
		});

		if (commandName === "clear") {
			clearHistory();
		} else {
			const historyItem = { command: trimmedCommand, outputs: [output] };
			addHistory([historyItem]);
		}

		setCommand("");
		setHistoryIndex(-1);
	};

	const handleHistoryNavigation = (direction: "up" | "down") => {
		const historyLength = history.length;
		if (historyLength === 0) return;

		if (direction === "up") {
			const newIndex =
				historyIndex < historyLength - 1 ? historyIndex + 1 : historyIndex;
			setHistoryIndex(newIndex);
			setCommand(history[historyLength - 1 - newIndex].command);
		} else {
			const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
			setHistoryIndex(newIndex);
			setCommand(
				newIndex >= 0 ? history[historyLength - 1 - newIndex].command : "",
			);
		}
	};

	const handleTabCompletion = () => {
		const autoCompleteCommand = Object.keys(commands).find((cmd) =>
			cmd.startsWith(command.toLowerCase()),
		);
		if (autoCompleteCommand) {
			setCommand(autoCompleteCommand);
		}
	};

	const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case "Enter":
				await handleCommand(command);
				break;
			case "ArrowUp":
				e.preventDefault();
				handleHistoryNavigation("up");
				break;
			case "ArrowDown":
				e.preventDefault();
				handleHistoryNavigation("down");
				break;
			case "Tab":
				e.preventDefault();
				handleTabCompletion();
				break;
			case "l":
			case "L":
				if (e.ctrlKey) {
					e.preventDefault();
					clearHistory();
					setCommand("");
				}
				break;
		}
	};

	return (
		<>
			<div className="flex w-full">
				<input
          id="terminal-input"
	 				ref={inputRef}
					aria-label="Command input"
					className={cn("w-full bg-transparent outline-none", className)}
					placeholder="Type a command..."
					style={{ color: currentTheme?.foreground }}
					value={command}
					onChange={(e) => setCommand(e.target.value)}
					onKeyDown={handleKeyDown}
          spellCheck="false"
				/>
			</div>
		</>
	);
}
