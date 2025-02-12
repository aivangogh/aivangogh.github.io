import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Tools(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div {...props} className={cn(props.className)}>
				<h1 className="text-3xl font-bold">/tools</h1>
			</div>
		</>
	);
}
