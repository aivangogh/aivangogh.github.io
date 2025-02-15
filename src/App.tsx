import { About } from "./components/about";
import { Banner } from "./components/banner";
import { Footer } from "./components/footer";
import { NavBar } from "./components/navbar";
import { Projects } from "./components/projects";
import { Terminal } from "./components/terminal";
import { Tools } from "./components/tools";
import { ContainerLayout } from "./layouts/container";
import { useThemeStore } from "./stores/useThemeStore";

function App() {
	const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());

	return (
		<>
			<div
        className="transition-all duration-300"
				style={{
					color: currentTheme?.foreground,
					backgroundColor: currentTheme?.background,
				}}
			>
				<ContainerLayout>
					<div className="flex flex-col gap-8 pb-4">
						<NavBar />
						<div className="max-md:px-4 flex flex-col gap-8">
							<Banner id="/" className="mx-auto mt-4" />
							<div className="flex items-center justify-center my-8 md:my-10">
								<Terminal
									id="terminal"
									className="aspect-video w-full sm:w-10/12 md:w-11/12 font-thin text-[10px] sm:text-xs md:text-sm"
								/>
							</div>

							<div className="flex flex-col gap-6 mt-10 md:mt-6">
								<About id="about" />
								<Projects id="projects" />
								<Tools id="tools" />
							</div>
						</div>
						<Footer className="w-full mt-8 mb-4"/>
					</div>
				</ContainerLayout>
			</div>
		</>
	);
}

export default App;
