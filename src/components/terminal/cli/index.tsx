import { RefObject, useEffect, useRef } from "react";
import { cn } from "../../../lib/utils";
import { useThemeStore } from "../../../stores/useThemeStore";
import { History } from "./history";
import { Input } from "./input";

type Props = {
	className?: string;
	cliRef: RefObject<HTMLDivElement>;
};

function CLI({ className, cliRef }: Props) {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const inputRef = useRef<HTMLInputElement>(null);

	// Focus input only when clicking inside the CLI window
	const handleClick = (e: MouseEvent) => {
		if (cliRef.current?.contains(e.target as Node)) {
			inputRef.current?.focus();
		}
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<>
			<div
				ref={cliRef}
				className={cn(
					"h-full w-full overflow-x-hidden overflow-y-auto px-1.5 py-1 font-medium cursor-text",
					className,
				)}
				style={{ backgroundColor: currentTheme?.background }}
			>
				<History />
				<div className="flex gap-1">
					<Input inputRef={inputRef} />
				</div>
			</div>
		</>
	);
}

export { CLI };
