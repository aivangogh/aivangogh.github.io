import { CLI } from "./components/window/cli";
import { TitleBar } from "./components/window/title-bar";

function App() {
	return (
		<>
			<div className="w-screen h-screen bg-slate-800 p-4 shadow-lg">
				<div className="w-full h-full">
					<TitleBar className="bg-gray-600" />
					<CLI />
				</div>
			</div>
		</>
	);
}

export default App;
