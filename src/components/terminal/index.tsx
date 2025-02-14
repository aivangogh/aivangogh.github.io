import { useRef } from "react";
import { cn } from "../../lib/utils";
import { useThemeStore } from "../../stores/useThemeStore";
import { CLI } from "./cli";
import { Keys } from "./keys";
import { TitleBar } from "./title-bar";

export function Terminal(props: React.HTMLAttributes<HTMLDivElement>) {
	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());
	const cliRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div {...props} className={cn("flex flex-col", props.className)}>
				<div
					className="w-full h-full shadow-lg"
					style={{ borderColor: currentTheme?.foreground }}
				>
					<TitleBar className="rounded-t-lg border-t border-x" />
					<CLI className="rounded-b-lg border-x border-b" cliRef={cliRef} />
          <Keys className="mt-2 md:hidden"/>
				</div>

			</div>
		</>
	);
}
