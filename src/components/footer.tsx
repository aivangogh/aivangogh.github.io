import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { useThemeStore } from "../stores/useThemeStore";

export function Footer(props: HTMLAttributes<HTMLDivElement>) {
	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());
	return (
		<>
			<footer
				className={cn(
					"flex items-center justify-center",
					props.className,
				)}
			>
				<p className="text-[10px] md:text-xs w-80 text-center">
					This portfolio was created by yours truly, but heavily inspired by{" "}
					<a
						className="hover:underline"
						href="https://mlapada.vercel.app/"
						target="_blank"
						style={{ color: currentTheme?.blue }}
					>
						Mark Anthony Lapada
					</a>
				</p>
			</footer>
		</>
	);
}
