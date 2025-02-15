export const handleSmoothScroll = (
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
		const y = targetElement.getBoundingClientRect().top + window.scrollY + -100;
		window.scrollTo({ top: y, behavior: "smooth" });
	}
};
