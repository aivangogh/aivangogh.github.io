import { TooltipProvider } from "../components/ui/tooltip";

export function ContainerLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TooltipProvider>
				<div className="md:w-8/12 mx-auto">{children}</div>
			</TooltipProvider>
		</>
	);
}
