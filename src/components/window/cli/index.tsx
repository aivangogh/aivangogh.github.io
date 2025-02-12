import { useEffect, useRef } from "react";
import { cn } from "../../../lib/utils";
import { History } from "./history";
import { Input } from "./input";
import { PS1 } from "./ps1";

type Props = {
	className?: string;
};

function CLI({ className }: Props) {
	const cliRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Focus input only when clicking inside the CLI window
	const handleClick = (e: MouseEvent) => {
		if (cliRef.current?.contains(e.target as Node)) {
			inputRef.current?.focus();
		}
	};

  useEffect(() => {
    inputRef.current?.focus(); 
  }, [])

	useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<>
			<div
        ref={cliRef}
				className={cn(
					"h-[calc(100vh-3.5rem)] rounded-b-xl bg-black overflow-y-scroll",
					className,
				)}
			>
				<History />
				<div className="flex gap-1">
					<PS1 />
					<Input inputRef={inputRef} />
				</div>
			</div>
		</>
	);
}

export { CLI };
