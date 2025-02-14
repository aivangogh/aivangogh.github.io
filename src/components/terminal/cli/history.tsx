"use client";

import { useHistoryStore } from "../../../stores/useHistoryStore";
import { useThemeStore } from "../../../stores/useThemeStore";
import { PS1 } from "./ps1";

export function History() {
	const { getCurrentColorScheme } = useThemeStore();
	const currentTheme = getCurrentColorScheme();
	const { history } = useHistoryStore();

	return (
		<>
			{history.map(({ command, outputs }, index) => (
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
							<div
								className="whitespace-pre-wrap"
								key={`output-${index}-${outputIndex}`}
							>
								{output}
							</div>
						))}
				</div>
			))}
		</>
	);
}
