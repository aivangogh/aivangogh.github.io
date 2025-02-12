import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function About(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div {...props} className={cn("flex flex-col gap-2",props.className)}>
				<h1 className="text-3xl font-bold">/about</h1>
				<p>
					Hello! My name is Ivan P. Gemota, and I am a full-stack developer with
					a passion for creating innovative solutions. I have a strong
					background in web development, and I am skilled in a wide range of
					programming languages and frameworks. I am also a passionate learner,
					constantly seeking out new technologies and techniques to improve my
					skills. If you are interested in working together, feel free to reach
					out to me via email or LinkedIn.
				</p>
			</div>
		</>
	);
}
