import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Header } from "../header";

export function About(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div {...props} className={cn("flex flex-col gap-2", props.className)}>
				<Header header="/about" />

				<div className="ml-4 mr-2 text-sm md:text-md space-y-2 text-justify">
					<p>
						Hello! I’m Ivan P. Gemota, a dedicated full-stack developer with a
						passion for crafting innovative and impactful digital solutions.
						With a solid foundation in web development, I bring expertise in a
						diverse array of programming languages and frameworks, enabling me
						to tackle complex challenges and deliver high-quality results.
					</p>
					<p>
						I thrive on continuous learning and am always exploring emerging
						technologies and best practices to refine my skills and stay ahead
						in the ever-evolving tech landscape. If you’re looking to
						collaborate or discuss potential opportunities, I’d love to connect!
						Feel free to reach out via email or LinkedIn—I look forward to
						hearing from you!
					</p>
				</div>
			</div>
		</>
	);
}
