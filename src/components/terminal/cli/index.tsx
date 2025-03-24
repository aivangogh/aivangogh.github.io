import { useCLIContext } from "@/contexts/cli";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/stores/useThemeStore";
import { memo, useEffect, useRef } from "react";
import { History } from "./history";
import { Input } from "./input";

type Props = {
	className?: string;
};

const CLI = memo(({ className }: Props) => {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const inputRef = useRef<HTMLInputElement>(null);
	const { cliRef } = useCLIContext();

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
});

export { CLI };
