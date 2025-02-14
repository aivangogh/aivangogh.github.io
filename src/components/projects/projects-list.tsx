import { HTMLAttributes } from "react";
import { FaGithub } from "react-icons/fa";
import { IoMdLink } from "react-icons/io";
import { cn } from "../../lib/utils";
import { getIconById } from "../../utils/utils";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useGetProjects } from "./fetch-projects";
import { type Project } from "./types";

type ProjectCardProps = {
	project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
	return (
		<>
			<div className="flex flex-col justify-between gap-1 w-full h-40 w-full max-md:w-72 border-1 p-2">
				<div className="flex flex-col gap-2">
					<h3 className="font-medium text-sm">{project.title}</h3>
					<p className="text-[10px] md:text-xs line-clamp-5">
						{project.description}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between gap-2">
					<div className="flex flex-wrap gap-2">
						{project.techStack.map((id, index) => {
							const icon = getIconById(id);
							return (
								<Tooltip key={index} delayDuration={0}>
									<TooltipTrigger>
										<div className="flex items-center gap-1">
											{icon?.icon({ className: "w-4 h-4" })}
										</div>
									</TooltipTrigger>
									<TooltipContent>{icon?.name}</TooltipContent>
								</Tooltip>
							);
						})}
					</div>
					<div className="flex items-center gap-2">
						{project.repo && (
							<a
								type="button"
								href={project.repo}
								className="flex items-center text-xs md:text-sm rounded border p-1"
								target="_blank"
								rel="noreferrer"
							>
								<FaGithub />
							</a>
						)}
						{project.link && (
							<a
								type="button"
								href={project.link}
								className="flex items-center text-xs md:text-sm rounded border p-1"
								target="_blank"
								rel="noreferrer"
							>
								<IoMdLink />
							</a>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export function ProjectsList(props: HTMLAttributes<HTMLDivElement>) {
	const { data: projects, isLoading } = useGetProjects();

	if (isLoading) {
		return (
			<>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{Array.from({ length: 3 }).map((_, index) => (
						<Skeleton key={index} className="w-full h-36 max-md:w-60 rounded-none" />
					))}
				</div>
			</>
		);
	}

	return (
		<>
			<div
				{...props}
				className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", props.className)}
			>
				{projects?.length! > 0 ? (
					projects?.map((project, index) => (
						<ProjectCard key={index} project={project} />
					))
				) : (
					<p>Oh snap! No projects found. It might some errors</p>
				)}
			</div>
		</>
	);
}
