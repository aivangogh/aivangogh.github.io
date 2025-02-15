import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Header } from "../header";
import { ProjectsList } from "./projects-list";

export function Projects(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div {...props} className={cn("flex flex-col gap-2", props.className)}>
        <Header header="/projects" />
        <div className="flex max-md:justify-center">
          <ProjectsList className="px-4" />
        </div>
			</div>
		</>
	);
}
