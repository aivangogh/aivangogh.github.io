import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function MobileActions(props: HTMLAttributes<HTMLDivElement>) {
	const dispatchKeyEvent = (key: string) => {
		const input = document.getElementById("terminal-input");
		if (input) {
			const event = new KeyboardEvent("keydown", {
				key: key,
				code:
					key === "Tab" ? "Tab" : key === "ArrowUp" ? "ArrowUp" : "ArrowDown",
				keyCode: key === "Tab" ? 9 : key === "ArrowUp" ? 38 : 40,
				bubbles: true,
				cancelable: true,
			});
			input.dispatchEvent(event);
		}
	};

	return (
		<>
			<div
				{...props}
				className={cn("w-full flex items-center justify-end", props.className)}
			>
				<div className="flex items-center gap-2">
					<button
						onClick={() => dispatchKeyEvent("Tab")}
						aria-label="Auto-complete"
						className="grid place-items-center h-8 w-12 border rounded-lg font-bold"
					>
						Tab
					</button>
					<button
						onClick={() => dispatchKeyEvent("ArrowUp")}
						aria-label="Next command"
						className="grid place-items-center h-8 w-8 border rounded-lg"
					>
						<CaretUpIcon />
					</button>
					<button
						onClick={() => dispatchKeyEvent("ArrowDown")}
						aria-label="Previous command"
						className="grid place-items-center h-8 w-8 border rounded-lg"
					>
						<CaretDownIcon />
					</button>
				</div>
			</div>
		</>
	);
}
