import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { QueryProvider } from "./contexts/query-provider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryProvider>
			<App />
		</QueryProvider>
	</StrictMode>,
);
