import { cn } from "../../lib/utils";
import { useThemeStore } from "../../stores/useThemeStore";

type Props = {
	className?: string;
};

function Actions() {
	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());
	return (
		<>
			<div className="flex items-center gap-2">
				<div className="h-3 w-3 rounded-full" style={{ backgroundColor: currentTheme?.red }}></div>
				<div className="h-3 w-3 rounded-full" style={{ backgroundColor: currentTheme?.yellow }}></div>
				<div className="h-3 w-3 rounded-full" style={{ backgroundColor: currentTheme?.green }}></div>
			</div>
		</>
	);
}

function Title() {
	return (
		<>
			<div className="flex items-center">
				<span className="text-foreground text-xs">My Porfolio</span>
			</div>
		</>
	);
}

function TitleBar({ className }: Props) {
	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());

	return (
		<>
			<div
				className={cn("flex items-center justify-between px-4 py-2", className)}
				style={{
					backgroundColor: currentTheme?.brightBlack,
					color: currentTheme?.foreground,
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
