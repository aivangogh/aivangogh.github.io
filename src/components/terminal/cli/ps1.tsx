import { useThemeStore } from "../../../stores/useThemeStore";

export function PS1() {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());

	return (
		<span className="font-medium flex flex-row">
			<span className="" style={{ color: currentTheme?.yellow }}>
				ivan
			</span>
			<span className="" style={{ color: currentTheme?.foreground }}>
				@
			</span>
			<span
				className="whitespace-nowrap"
				style={{ color: currentTheme?.green }}
			>
				portfolio
			</span>
			<span className="flex" style={{ color: currentTheme?.foreground }}>:$</span>
		</span>
	);
}
