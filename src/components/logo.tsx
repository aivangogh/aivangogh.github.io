import { handleSmoothScroll } from "../hooks/useSmoothScroll";

export function Logo() {
	return (
		<>
			<div>
				<a
					href="/"
					className="font-extrabold text:md md:text-lg"
					onClick={(event) => handleSmoothScroll(event, "/")}
				>
					aivan_dev
				</a>
			</div>
		</>
	);
}
