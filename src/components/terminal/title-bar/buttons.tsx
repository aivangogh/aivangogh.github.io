import { useThemeStore } from "@/stores/useThemeStore";

export function Buttons() {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());

	return (
		<>
			<div className="flex items-center gap-1.5 md:gap-2">
				<div
					className="h-2 md:h-3 w-2 md:w-3 rounded-full"
					style={{ backgroundColor: currentTheme?.red }}
				/>
				<div
					className="h-2 md:h-3 w-2 md:w-3 rounded-full"
					style={{ backgroundColor: currentTheme?.yellow }}
				/>
				<div
					className="h-2 md:h-3 w-2 md:w-3 rounded-full"
					style={{ backgroundColor: currentTheme?.green }}
				/>
			</div>
		</>
	);
}
