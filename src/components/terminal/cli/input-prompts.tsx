import { usePromptStore } from "@/stores/usePromptStore";
import { useThemeStore } from "@/stores/useThemeStore";

export function InputPrompts() {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const prompts = usePromptStore((state) => state.prompts);

	return (
		<>
			{prompts.map((prompt, index) => (
				<div key={index} style={{ color: currentTheme?.foreground }}>
					<div
						style={{ color: currentTheme?.foreground }}
						className="flex flex-row"
					>
						<pre className="whitespace-pre-wrap font-mono">
							{prompt.message}
						</pre>
					</div>
				</div>
			))}
		</>
	);
}
