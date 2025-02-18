import { HTMLAttributes } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import packageJson from "../../../package.json";
import { cn } from "../../lib/utils";

export function Banner(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div className={cn("w-fit", props.className)}>
				<h3 className="font-medium">Hi! I'm</h3>
				<h1 className="text-4xl font-extrabold">{packageJson.author.name}</h1>
				<div className="flex flex-col items-end">
					<p>Web Developer</p>
					<div className="flex items-center gap-2">
						<a
							href={`mailto:${packageJson.author.email}`}
							target="_blank"
							rel="noreferrer"
						>
							<MdEmail />
						</a>
						<a
							href={packageJson.author.github}
							target="_blank"
							rel="noreferrer"
						>
							<FaGithub />
						</a>
						<a
							href={packageJson.author.linkedIn}
							target="_blank"
							rel="noreferrer"
						>
							<FaLinkedin />
						</a>
            <a
              href={packageJson.author.facebook}
              target="_blank"
              rel="noreferrer"><FaFacebook /></a>
					</div>
				</div>
			</div>
		</>
	);
}
