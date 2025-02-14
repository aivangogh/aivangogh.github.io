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
			id: "projects",
			name: "projects",
			href: "#projects",
		},
		{
			id: "tools",
			name: "tools",
			href: "#tools",
		},
	] satisfies Links[];

	const handleSmoothScroll = (
		event: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		// Prevent the default anchor link behavior
		event.preventDefault();

		// Get the target element's ID from the href
		const targetId = href.replace("#", "");
		const targetElement = document.getElementById(targetId);

		// Scroll to the target element smoothly
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<div>
				<ul className="text-sm md:text-md flex gap-2 md:gap-4">
					{links.map((link) => (
						<li key={link.id}>
							<a
								className="hover:underline cursor-pointer"
								onClick={(event) => handleSmoothScroll(event, link.href)}
								href={link.href}
							>
								{link.name}
							</a>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
