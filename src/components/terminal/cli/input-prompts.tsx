import { useInputPromptStore } from "../../../stores/useInputPromptStore";
import { useThemeStore } from "../../../stores/useThemeStore";
import { PS1 } from "./ps1";

export function InputPrompts() {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const promptMessage = useInputPromptStore((state) => state.promptMessage);

	return (
		<>
			<div style={{ color: currentTheme?.foreground }}>
				<div className="flex flex-row">
					<PS1 />
					<div className="flex">
						<div className="px-1">command</div>
					</div>
				</div>
				<pre className="whitespace-pre-wrap font-mono">{promptMessage}</pre>
			</div>
		</>
	);
}
