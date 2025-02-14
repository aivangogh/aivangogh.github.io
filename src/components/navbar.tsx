import { useThemeStore } from "../stores/useThemeStore";
import { Links } from "./links";
import { Logo } from "./logo";

export function NavBar() {
	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());

	return (
		<>
			<nav
				className="sticky top-0 z-10 max-md:px-4 flex items-center justify-between py-2 border-b"
				style={{ backgroundColor: currentTheme?.background }}
			>
				<Logo />
				<Links />
			</nav>
		</>
	);
}
