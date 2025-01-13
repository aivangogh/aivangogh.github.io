import { cn } from "../../../lib/utils";
import { useThemeStore } from "../../../stores/useThemeStore";

function PS1() {
	const hostname = window.location.hostname;
	const { getCurrentColorScheme } = useThemeStore();

	return (
		<>
			<h1 className="font-bold flex">
				<span className={cn(`text-[${getCurrentColorScheme()?.yellow}]`)}>
					guest
				</span>
				<span className={cn({ color: getCurrentColorScheme()?.white })}>@</span>
				<span className={cn({ color: getCurrentColorScheme()?.green })}>
					{hostname}
				</span>
				<span className={cn({ color: getCurrentColorScheme()?.white })}>
					:~$
				</span>
			</h1>
		</>
	);
}

export { PS1 };
