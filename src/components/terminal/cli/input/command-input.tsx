import { KeyboardEvent, RefObject } from "react";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/stores/useThemeStore";
import { allCommands } from "@/utils/command";
import { PS1 } from "@/components/terminal/cli/ps1";

type CommandInputProps = {
	className?: string;
	inputRef: RefObject<HTMLInputElement>;
	command: string;
	onCommandChange: (value: string) => void;
	onCommandSubmit: (command: string) => Promise<void>;
	onHistoryNavigation: (direction: "up" | "down") => void;
	placeholderText?: string;
};

export function CommandInput({
	className,
	inputRef,
	command,
	onCommandChange,
	onCommandSubmit,
	onHistoryNavigation,
	placeholderText = "Type a command...",
}: CommandInputProps) {
	const themeStore = useThemeStore();

	const handleTabCompletion = () => {
		const autoCompleteCommand = Object.keys(allCommands).find((cmd) =>
			cmd.startsWith(command.toLowerCase()),
		);
		if (autoCompleteCommand) {
			onCommandChange(autoCompleteCommand);
		}
	};

	const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case "Enter":
				await onCommandSubmit(command);
				break;
			case "ArrowUp":
				e.preventDefault();
				onHistoryNavigation("up");
				break;
			case "ArrowDown":
				e.preventDefault();
				onHistoryNavigation("down");
				break;
			case "Tab":
				e.preventDefault();
				handleTabCompletion();
				break;
			case "l":
			case "L":
				if (e.ctrlKey) {
					e.preventDefault();
					onCommandChange("");
				}
				break;
		}
	};

	return (
		<div className="w-full flex flex-row gap-0.5 md:gap-1">
			<PS1 />
			<input
				id="terminal-input"
				ref={inputRef}
				aria-label="Command input"
				className={cn("w-full bg-transparent outline-none", className)}
				placeholder={placeholderText}
				style={{ color: themeStore.getTerminalColorScheme()?.foreground }}
				value={command}
				onChange={(e) => onCommandChange(e.target.value)}
				onKeyDown={handleKeyDown}
				spellCheck="false"
			/>
		</div>
	);
}
