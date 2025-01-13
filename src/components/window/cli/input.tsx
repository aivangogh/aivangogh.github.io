import { cn } from "../../../lib/utils";

type Props = {
	className?: string;
}

function Input({ className }: Props) {
	return (
		<>
			<input
				className={cn("text-white bg-transparent outline-none", className)}
			/>
		</>
	);
}

export { Input };
