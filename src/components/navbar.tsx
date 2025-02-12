import { Logo } from "./logo";
import { Nav } from "./nav";

export function NavBar() {
	return (
		<>
			<nav className="flex items-center justify-between py-2 border-b">
				<Logo />
        <Nav />
			</nav>
		</>
	);
}
