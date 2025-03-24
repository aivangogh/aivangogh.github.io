import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/stores/useThemeStore";
import { Buttons } from "./buttons";
import { Actions } from "./actions";

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
        <Buttons />
				<Title />
        <Actions />
			</div>
		</>
	);
}

export { TitleBar };
