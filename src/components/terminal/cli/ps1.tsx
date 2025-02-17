import { useThemeStore } from "../../../stores/useThemeStore";

function PS1() {
	//const hostname = window.location.hostname;
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());

	return (
		<h1 className="font-medium flex">
			{
				// <span className="hidden md:inline" style={{ color: currentTheme?.foreground }}>@</span>
				// <span className="whitespace-nowrap" style={{ color: currentTheme?.green }}>{hostname}</span>
			}
      <span className="" style={{ color: currentTheme?.yellow }}>guest</span>
			<span style={{ color: currentTheme?.foreground }}>:$</span>
		</h1>
	);
}

export { PS1 };
