import { HTMLAttributes } from "react";
import { handleSmoothScroll } from "../hooks/useSmoothScroll";
import { cn } from "../lib/utils";

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div {...props} className={cn(props.className)}>
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
