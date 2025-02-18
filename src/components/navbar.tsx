import { useThemeStore } from "../stores/useThemeStore";
import { Links } from "./links";
import { Logo } from "./logo";

export function NavBar() {
	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());

	return (
		<>
			<nav
				className="sticky w-full top-0 z-10 flex items-center justify-center md:justify-between py-2 border-b"
				style={{ backgroundColor: currentTheme?.background }}
			>
				<Logo className="max-md:hidden" />
				<Links />
			</nav>
		</>
	);
}
