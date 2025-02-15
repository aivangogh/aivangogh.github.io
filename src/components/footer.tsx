import { getIconById } from "../utils/utils";
import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Footer(props: HTMLAttributes<HTMLDivElement>) {
	const techStackUsed = ["typescript", "react", "tailwindcss", "zustand"];

	return (
		<>
			<footer className={cn("flex flex-col items-center gap-2 max-md:px-4", props.className)}>
				<p className="text-xs md:text-sm">Tech stack used</p>
				<div className="flex gap-2">
					{techStackUsed.map((tech, index) => {
						const icon = getIconById(tech);

						return (
							<Tooltip key={index} delayDuration={0}>
								<TooltipTrigger>
									<div className="flex items-center">
										{icon?.icon({ className: "w-4 h-4" })}
									</div>
								</TooltipTrigger>
								<TooltipContent>{icon?.name}</TooltipContent>
							</Tooltip>
						);
					})}
				</div>
			</footer>
		</>
	);
}
