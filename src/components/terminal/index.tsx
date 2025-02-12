import { cn } from "../../lib/utils";
import { CLI } from "./cli";
import { TitleBar } from "./title-bar";

export function Terminal(props: React.HTMLAttributes<HTMLDivElement>) {

	return (
		<>
			<div {...props} className={cn(props.className)}>
				<div className="w-full h-full shadow-lg">
					<TitleBar className="rounded-t-lg"  />
					<CLI className="rounded-b-lg" />
				</div>
			</div>
		</>
	);
}
