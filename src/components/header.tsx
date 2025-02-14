import { HTMLAttributes } from "react";

type HeaderProps = {
	header: string;
};

export function Header(
	props: HTMLAttributes<HTMLHeadingElement> & HeaderProps,
) {
	return (
		<>
			<h1 {...props} className="text-2xl md:text-3xl font-bold">
				{props.header}
			</h1>
		</>
	);
}
