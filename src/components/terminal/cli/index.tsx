import { useCLIContext } from "@/contexts/cli";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/stores/useThemeStore";
import { memo, useCallback, useEffect, useRef } from "react";
import { History } from "./history";
import { Input } from "./input";

type Props = {
	className?: string;
};

const CLI = memo(({ className }: Props) => {
	const { setInputRef } = useCLIContext();
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const localInputRef = useRef<HTMLInputElement>(null);

	// Update context with local ref
	useEffect(() => {
		setInputRef(localInputRef);
	}, [setInputRef]);

	// Focus the input
	const focusInput = useCallback(() => {
		if (localInputRef.current) {
			localInputRef.current.focus();
		}
	}, []);

	// Focus on mount and after re-renders
	useEffect(() => {
		focusInput();
	}, [focusInput]);

	// Handle clicks to focus the input
	const handleClick = useCallback(() => {
		focusInput();
	}, [focusInput]);

	return (
		<div
			onClick={handleClick}
			className={cn(
				"w-full h-full overflow-x-hidden overflow-y-auto px-1.5 py-1 font-medium cursor-text",
				className,
			)}
			style={{ backgroundColor: currentTheme?.background }}
		>
			<History />
			<div className="flex gap-1 w-full">
				<Input inputRef={localInputRef} />
			</div>
		</div>
	);
});

CLI.displayName = "CLI";

export { CLI };

