import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { useThemeStore } from "../../stores/useThemeStore";

function Actions() {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	return (
		<>
			<div className="flex items-center gap-1.5 md:gap-2">
				<div
					className="h-2 md:h-3 w-2 md:w-3 rounded-full"
					style={{ backgroundColor: currentTheme?.red }}
				></div>
				<div
					className="h-2 md:h-3 w-2 md:w-3 rounded-full"
					style={{ backgroundColor: currentTheme?.yellow }}
				></div>
				<div
					className="h-2 md:h-3 w-2 md:w-3 rounded-full"
					style={{ backgroundColor: currentTheme?.green }}
				></div>
			</div>
		</>
	);
}

function Title() {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	return (
		<>
			<div className="flex items-center">
				<span
					className="text-[10px] md:text-xs font-medium"
					style={{
						color: currentTheme?.foreground,
					}}
				>
					My Porfolio
				</span>
			</div>
		</>
	);
}

function TitleBar(props: HTMLAttributes<HTMLDivElement>) {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());

	return (
		<>
			<div
				{...props}
				className={cn(
					"flex items-center justify-between px-2 md:px-4 py-1 md:py-2 border-b",
					props.className,
				)}
				style={{
					backgroundColor: currentTheme?.background,
				}}
			>
				<Actions />
				<Title />
				<div className="w-12" />
			</div>
		</>
	);
}

export { TitleBar };
