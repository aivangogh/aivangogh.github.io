import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Header } from "../header";
import { icons as tools } from "../icons";

function CardTools(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div {...props} className={cn(props.className)}>
				{tools.map((tool) => (
					<div
						key={tool.id}
						className="w-16 h-16 md:w-20 md:h-20 px-2 py-2 border flex flex-col items-center justify-center gap-2"
					>
						<tool.icon className="w-8 h-8" />
						<span className="flex items-end text-[8px] md:text-[10px] text-center">
							{tool.name}
						</span>
					</div>
				))}
			</div>
		</>
	);
}

export function Skills(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div {...props} className={cn("flex flex-col gap-6", props.className)}>
				<div>
					<Header header="skills.sh" />
					<p className="max-md:text-xs text-sm">Technologies and tools</p>
				</div>
				<div className="ml-4">
					<CardTools className="flex flex-wrap gap-2" />
				</div>
			</div>
		</>
	);
}
