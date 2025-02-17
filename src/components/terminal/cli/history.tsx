import { useHistoryStore } from "../../../stores/useHistoryStore";
import { useThemeStore } from "../../../stores/useThemeStore";
import { PS1 } from "./ps1";

export function History() {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const { historyBuffer } = useHistoryStore();

	return (
		<>
			{historyBuffer.map(({ command, outputs }, index) => (
				<div key={index} style={{ color: currentTheme?.foreground }}>
					{command !== "banner" && (
						<div className="flex flex-row">
							<PS1 />
							<div className="flex">
								<div key={index} className="px-1">
									{command}
								</div>
							</div>
						</div>
					)}
					{outputs &&
						outputs.map((output, outputIndex) => (
							<pre
								className="whitespace-pre-wrap font-mono"
								key={`output-${index}-${outputIndex}`}
							>
								{output}
							</pre>
						))}
				</div>
			))}
		</>
	);
}
