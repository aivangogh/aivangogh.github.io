import { handleSmoothScroll } from "../hooks/useSmoothScroll";

type Links = {
	id: string;
	name: string;
	href: string;
};

export function Links() {
	const links = [
		{
			id: "terminal",
			name: "terminal",
			href: "#terminal",
		},
		{
			id: "about",
			name: "about",
			href: "#about",
		},
		{
			id: "experience",
			name: "experience",
			href: "#experience",
		},
		{
			id: "projects",
			name: "projects",
			href: "#projects",
		},
		{
			id: "skills",
			name: "skills",
			href: "#skills",
		},
	] satisfies Links[];

	return (
		<>
			<div className="text-sm md:text-md flex gap-0.5 md:gap-4">
				{links.map((link) => (
					<div
						key={link.id}
						className="group inline-block hover:font-medium cursor-pointer"
					>
						<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							/
						</span>
						<a
							onClick={(event) => handleSmoothScroll(event, link.href)}
							href={link.href}
						>
							{link.name}
						</a>
					</div>
				))}
			</div>
		</>
	);
}
