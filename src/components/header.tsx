import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";

type HeaderProps = {
	header: string;
	cat?: boolean;
};

export function Header({
	header,
	cat = false,
	...props
}: HeaderProps & HTMLAttributes<HTMLHeadingElement>) {
	return (
		<>
			<h1
				{...props}
				className={cn(
					"text-xl font-medium flex items-center gap-2",
					props.className,
				)}
			>
				<span>$</span>
				{`${cat ? "cat" : ""} ./${header}`}
			</h1>
		</>
	);
}
