"use client";

import { CLIContextProvider } from "@/contexts/cli";
import { cn } from "@/lib/utils";
import { useHistoryStore } from "@/stores/useHistoryStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { useToggleTitleBarActionsStore } from "@/stores/useToggleTitleBarActionsStore";
import { executeCommand } from "@/utils/command";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { memo, useEffect, useRef, useState } from "react";
import { CLI } from "./cli";
import { MobileActions } from "./mobile-actions";
import { TitleBar } from "./title-bar";

type TerminalProps = React.HTMLAttributes<HTMLDivElement>;

const Terminal = memo(({ className, ...props }: TerminalProps) => {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const isFullScreen = useToggleTitleBarActionsStore(
		(state) => state.isFullScreen,
	);
	const terminalDivRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={terminalDivRef}
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
					<MobileActions />
				</div>
			</div>
		</div>
	);
});

function executeBanner() {
	const addHistoryBuffer = useHistoryStore((state) => state.addHistoryBuffer);
	const hasBannerExecuted = useRef(false);

	useEffect(() => {
		if (!hasBannerExecuted.current) {
			const executeBanner = async () => {
				const output = await executeCommand("banner", []);
				if (typeof output === "string") {
					addHistoryBuffer({
						command: "banner",
						outputs: [output],
					});
				}
			};
			executeBanner();
			hasBannerExecuted.current = true;
		}
	}, []);
}

const TerminalWindow = (props: React.HTMLAttributes<HTMLDivElement>) => {
	const currentTheme = useThemeStore((state) => state.getTerminalColorScheme());
	const isFullScreen = useToggleTitleBarActionsStore(
		(state) => state.isFullScreen,
	);
	const [terminalRect, setTerminalRect] = useState<DOMRect | null>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	executeBanner();

	useEffect(() => {
		if (!isFullScreen && terminalRef.current) {
			const rect = terminalRef.current.getBoundingClientRect();
			setTerminalRect(rect);
		}
	}, [isFullScreen]);

	return (
		<CLIContextProvider>
			<div className="w-full h-full text-sm">
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
								willChange: "transform",
								backfaceVisibility: "hidden" as const,
								transformOrigin: "top left",
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

