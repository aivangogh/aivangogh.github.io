import { useThemeStore } from "../../../stores/useThemeStore";

export function PS1() {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());

	return (
		<h1 className="font-medium flex">
			<span className="" style={{ color: currentTheme?.yellow }}>
				ivan
			</span>
			<span
				className="hidden md:inline"
				style={{ color: currentTheme?.foreground }}
			>
				@
			</span>
			<span
				className="whitespace-nowrap"
				style={{ color: currentTheme?.green }}
			>
				portfolio
			</span>

			<span style={{ color: currentTheme?.foreground }}>:$</span>
		</h1>
	);
}
