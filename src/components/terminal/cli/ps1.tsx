import { useThemeStore } from "@/stores/useThemeStore";
import { memo } from "react";

const PS1 = memo(() => {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());

	return (
		<span className="font-medium flex flex-row w-fit whitespace-nowrap">
			<span style={{ color: currentTheme?.yellow }}>ivan</span>
			<span style={{ color: currentTheme?.foreground }}>@</span>
			<span style={{ color: currentTheme?.green }}>portfolio</span>
			<span style={{ color: currentTheme?.foreground }}>:$</span>
		</span>
	);
});

export { PS1 };
