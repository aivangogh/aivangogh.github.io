import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Header } from "../header";
import { ExperiencesList } from "./experience-list";

export function Experience(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div {...props} className={cn("flex flex-col gap-2", props.className)}>
				<Header header="experience.sh" />

				<div className="flex max-md:justify-center">
					<ExperiencesList className="px-4" />
				</div>
			</div>
		</>
	);
}
