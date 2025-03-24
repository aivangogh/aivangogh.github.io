"use client";

import type React from "react";

import { CLIContextProvider, useCLIContext } from "@/contexts/cli";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/stores/useThemeStore";
import { useToggleTitleBarActionsStore } from "@/stores/useToggleTitleBarActionsStore";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { CLI } from "./cli";
import { Keys } from "./keys";
import { TitleBar } from "./title-bar";

type TerminalProps = React.HTMLAttributes<HTMLDivElement>;

const Terminal = memo(({ className, ...props }: TerminalProps) => {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const isFullScreen = useToggleTitleBarActionsStore(
		(state) => state.isFullScreen,
	);

	return (
		<div
      {...props}
			className={cn(
				"flex flex-col shadow-lg rounded-lg w-full",
				isFullScreen ? "h-full mx-auto max-w-screen p-4" : "h-full",
        className,
			)}
			style={{
				borderColor: currentTheme?.foreground,
				backgroundColor: currentTheme?.background,
			}}
		>
			<div className="h-full flex flex-col">
				<div>
					<TitleBar className="rounded-t-lg border-t border-x" />
				</div>
				<div className="flex-1 overflow-hidden">
					<CLI
						className={cn(
							"rounded-b-lg border-x border-b flex-1 hide-scrollbar overflow-auto",
							"max-h-full",
						)}
					/>
				</div>
				<div className={cn("mt-2", isFullScreen ? "hidden" : "md:hidden")}>
					<Keys />
				</div>
			</div>
		</div>
	);
});

const TerminalWindow = (props: React.HTMLAttributes<HTMLDivElement>) => {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const isFullScreen = useToggleTitleBarActionsStore(
		(state) => state.isFullScreen,
	);
	const { cliRef } = useCLIContext(); 
	const [terminalRect, setTerminalRect] = useState<DOMRect | null>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	// Focus CLI when entering fullscreen
	useEffect(() => {
		if (isFullScreen && cliRef.current) {
			cliRef.current.focus();
		}
	}, [isFullScreen]);

	// Capture the position and size of the terminal before going fullscreen
	useEffect(() => {
		if (!isFullScreen && terminalRef.current) {
			const rect = terminalRef.current.getBoundingClientRect();
			setTerminalRect(rect);
		}
	}, [isFullScreen]);

	// Performance optimization styles applied inline
	const performanceStyles = {
		willChange: "transform",
		backfaceVisibility: "hidden" as const,
		transformOrigin: "top left",
	};

	return (
		<CLIContextProvider>
			<div className="w-full h-full">
				{!isFullScreen && (
					<div
						{...props}
						ref={terminalRef}
						className={cn(
							"aspect-video w-full mx-auto sm:w-10/12 md:w-11/12",
							props.className,
						)}
						style={{
							aspectRatio: "16/9",
							height: "auto",
						}}
					>
						<Terminal />
					</div>
				)}

				<AnimatePresence>
					{isFullScreen && (
						<motion.div
							initial={{
								position: "fixed",
								top: terminalRect?.top ?? 0,
								left: terminalRect?.left ?? 0,
								width: terminalRect?.width ?? "100%",
								height: terminalRect?.height ?? "100%",
								zIndex: 9999,
							}}
							animate={{
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
							}}
							exit={{
								top: terminalRect?.top ?? 0,
								left: terminalRect?.left ?? 0,
								width: terminalRect?.width ?? "100%",
								height: terminalRect?.height ?? "100%",
							}}
							transition={{
								duration: 0.3,
								ease: [0.32, 0.72, 0, 1],
							}}
							style={{
								backgroundColor: currentTheme?.background,
								...performanceStyles,
							}}
						>
							<Terminal />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</CLIContextProvider>
	);
};

export { TerminalWindow };

