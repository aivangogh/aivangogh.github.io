import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";

type HeaderProps = {
	header: string;
};

export function Header(
	props: HTMLAttributes<HTMLHeadingElement> & HeaderProps,
) {
	return (
		<>
			<h1 {...props} className={cn("text-2xl md:text-3xl font-bold mb-2", props.className)}>
				{props.header}
			</h1>
		</>
	);
}
