import { HTMLAttributes } from "react";
import { FaGithub, FaImage } from "react-icons/fa";
import { IoMdLink } from "react-icons/io";
import { cn } from "../../lib/utils";
import { useThemeStore } from "../../stores/useThemeStore";
import { getIconById } from "../../utils/utils";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useGetExperiences } from "./fetch-experiences";
import { Experience } from "./types";

type ExperienceCardProps = {
	experience: Experience;
};

function ExperienceCard({ experience }: ExperienceCardProps) {
	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());
	return (
		<>
			<div
				className="font-mono p-2 border"
				style={{ background: currentTheme?.background }}
			>
				<div className="grid grid-cols-8 gap-2 items-start justify-between mb-2">
					<div className="col-span-5">
						<h3 className="text-md md:text-md font-semibold">
							{experience.company}
						</h3>
						<div className="flex flex-row items-baseline text-nowrap gap-1 md:gap-1.5">
							<p className="text-xs md:text-sm">{experience.project}</p>
							<span className="text-xs">-</span>
							<p className="text-xs text-muted-foreground">{experience.role}</p>
						</div>
					</div>
					<span className="col-span-3 text-[10px] md:text-sm text-muted-foreground text-end">
						{experience.period}
					</span>
				</div>
				<div className="text-xs md:text-sm space-y-2 mb-4">
					{experience.description.map((desc, i) => (
						<div key={i} className="flex items-start">
							<span className="text-muted-foreground mr-2">$</span>
							<span>{desc}</span>
						</div>
					))}
				</div>
				<div className="flex flex-row items-center justify-between gap-2">
					<div className="flex flex-wrap gap-2">
						{experience.techStack.map((id, index) => {
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
						{experience.repo && (
							<a
								type="button"
								href={experience.repo}
								className="flex items-center text-xs md:text-sm rounded border p-1"
								target="_blank"
								rel="noreferrer"
							>
								<FaGithub />
							</a>
						)}
						{experience.link && (
							<a
								type="button"
								href={experience.link}
								className="flex items-center text-xs md:text-sm rounded border p-1"
								target="_blank"
								rel="noreferrer"
							>
								<IoMdLink />
							</a>
						)}
            {
              experience.imageLink && (
                <a
                  type="button"
                  href={experience.imageLink}
                  className="flex items-center text-xs md:text-sm rounded border p-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaImage />
                </a>
              )
            }
					</div>
				</div>
			</div>
		</>
	);
}

export function ExperiencesList(props: HTMLAttributes<HTMLDivElement>) {
	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());
	const { data: experiences, isLoading } = useGetExperiences();

	if (isLoading) {
		return (
			<>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{Array.from({ length: 3 }).map((_, index) => (
						<Skeleton
							key={index}
							className="w-full h-36 max-md:w-60 rounded-none"
							style={{ background: currentTheme?.foreground }}
						/>
					))}
				</div>
			</>
		);
	}

	return (
		<>
			<div className="relative ml-4 pl-2 md:pl-4 border-l">
				<div
					{...props}
					className={cn("grid grid-cols-1 gap-4", props.className)}
				>
					{experiences?.map((experience, index) => (
						<ExperienceCard key={index} experience={experience} />
					))}
				</div>
			</div>
		</>
	);
}
