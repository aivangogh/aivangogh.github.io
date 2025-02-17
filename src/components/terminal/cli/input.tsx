import { KeyboardEvent, RefObject, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { useHistoryStore } from "../../../stores/useHistoryStore";
import { useInputPromptStore } from "../../../stores/useInputPromptStore";
import { useThemeStore } from "../../../stores/useThemeStore";
import { allCommands, executeCommand } from "../../../utils/commands";

type Props = {
	className?: string;
	inputRef: RefObject<HTMLInputElement>;
};

type PromptState = {
	isWaiting: boolean;
	message: string;
	command: string;
	onResponse: ((response: string) => Promise<string> | string) | null;
};

export function Input({ className, inputRef }: Props) {
  const themeStore = useThemeStore();

	const historyStore = useHistoryStore();
	const [historyIndex, setHistoryIndex] = useState(-1);

	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const promptStore = useInputPromptStore();
	const [command, setCommand] = useState<string>("");
	const [promptState, setPromptState] = useState<PromptState>({
		isWaiting: false,
		message: "",
		command: "",
		onResponse: null,
	});

	useEffect(() => {
		const executeBanner = async () => {
			if (isInitialLoad) {
				const output = await executeCommand("banner", []);

				if (typeof output === "string") {
					historyStore.addHistoryBuffer({
						command: "banner",
						outputs: [output],
					});
				}
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

		const initialHistoryItem = { command: trimmedCommand, outputs: [] };
		historyStore.addHistoryBuffer(initialHistoryItem);

		const [commandName, ...args] = trimmedCommand.split(" ");

		const result = await executeCommand(commandName, args, {
			themeUtils: themeStore,
			historyUtils: historyStore,
		});

    console.log(result);

		if (typeof result === "string") {
			// Update the last history item with the output
			historyStore.updateLastHistoryItem({
				command: trimmedCommand,
				outputs: [result],
			});
			setCommand("");
			setHistoryIndex(-1);
		} else if (result.isPrompt) {
			promptStore.setPromptBoolean(true);
			promptStore.setPromptMessage(result.message);

			historyStore.updateLastHistoryItem({
				command: trimmedCommand,
				outputs: [result.message],
			});

			setPromptState({
				isWaiting: true,
				message: result.message,
				command: trimmedCommand,
				onResponse: result.onResponse || null,
			});
			setCommand("");
		}
	};

	const handlePromptResponse = async (response: string) => {
		if (promptState.onResponse) {
			const result = await promptState.onResponse(response);

			const historyItem = {
				command: promptState.command,
				outputs: [result],
			};
			historyStore.addHistoryBuffer(historyItem);
		}
		setPromptState({
			isWaiting: false,
			message: "",
			command: "",
			onResponse: null,
		});
		setCommand("");
		promptStore.setPromptMessage("");
		promptStore.resetPromptBoolean();
	};

	const handleHistoryNavigation = (direction: "up" | "down") => {
		const historyLength = historyStore.history.length;
		if (historyLength === 0) return;

		if (direction === "up") {
			const newIndex =
				historyIndex < historyLength - 1 ? historyIndex + 1 : historyIndex;
			setHistoryIndex(newIndex);
			setCommand(historyStore.history[historyLength - 1 - newIndex].command);
		} else {
			const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
			setHistoryIndex(newIndex);
			setCommand(
				newIndex >= 0
					? historyStore.history[historyLength - 1 - newIndex].command
					: "",
			);
		}
	};

	const handleTabCompletion = () => {
		const autoCompleteCommand = Object.keys(allCommands).find((cmd) =>
			cmd.startsWith(command.toLowerCase()),
		);
		if (autoCompleteCommand) {
			setCommand(autoCompleteCommand);
		}
	};

	const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case "Enter":
				if (promptState.isWaiting) {
					await handlePromptResponse(command);
				} else {
					await handleCommand(command);
				}
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
					historyStore.clearHistoryBuffer();
					setCommand("");
				}
				break;
		}
	};

	return (
		<>
			<div className="flex w-full">
				{promptStore.isPrompt ? (
					<input
						id="terminal-input"
						ref={inputRef}
						aria-label="Command input"
						className={cn("w-full bg-transparent outline-none", className)}
						style={{ color: themeStore.getTerminalColorScheme()?.foreground }}
						value={command}
						onChange={(e) => setCommand(e.target.value)}
						onKeyDown={handleKeyDown}
						spellCheck="false"
					/>
				) : (
					<input
						id="terminal-input"
						ref={inputRef}
						aria-label="Command input"
						className={cn("w-full bg-transparent outline-none", className)}
						placeholder={
							promptState.isWaiting ? promptState.message : "Type a command..."
						}
						style={{ color: themeStore.getTerminalColorScheme()?.foreground }}
						value={command}
						onChange={(e) => setCommand(e.target.value)}
						onKeyDown={handleKeyDown}
						spellCheck="false"
					/>
				)}
			</div>
		</>
	);
}
