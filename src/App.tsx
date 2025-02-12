import { About } from "./components/about";
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
        style={{
          color: currentTheme?.foreground,
          backgroundColor: currentTheme?.background,
        }}
      >
        <ContainerLayout>
          <div className="flex flex-col gap-4">
            <NavBar />
            <div className="flex flex-col">
              <div className="flex items-center justify-center h-[80svh]">
                <Terminal
                  id="terminal"
                  className="w-10/12 h-96 font-thin text-sm"
                />
              </div>

              <div className="flex flex-col gap-6">
                <About id="about" />
                <Projects id="projects" />
                <Tools id="tools" />
              </div>
            </div>
          </div>
        </ContainerLayout>
      </div>
    </>
  );
}

export default App;
