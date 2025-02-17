import { RefObject, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { useHistoryStore } from "../../../stores/useHistoryStore";
import { useInputPromptStore } from "../../../stores/useInputPromptStore";
import { useThemeStore } from "../../../stores/useThemeStore"; // Add this import
import { executeCommand } from "../../../utils/command";
import { CommandInput } from "./input/command-input";
import { PromptInput } from "./input/prompt-input";

type Props = {
  className?: string;
  inputRef: RefObject<HTMLInputElement>;
};

type PromptState = {
  isWaiting: boolean;
  message: string;
  command: string;
  onResponse: ((response: string) => Promise<string> | string) | null;
};

export function Input({ className, inputRef }: Props) {
  const historyStore = useHistoryStore();
  const themeStore = useThemeStore(); // Add this line
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const promptStore = useInputPromptStore();
  const [command, setCommand] = useState<string>("");
  const [promptState, setPromptState] = useState<PromptState>({
    isWaiting: false,
    message: "",
    command: "",
    onResponse: null,
  });

  useEffect(() => {
    const executeBanner = async () => {
      if (isInitialLoad) {
        const output = await executeCommand("banner", [], {
          themeUtils: themeStore,
          historyUtils: historyStore,
        }); // Add utility objects here
        if (typeof output === "string") {
          historyStore.addHistoryBuffer({
            command: "banner",
            outputs: [output],
          });
        }
        setIsInitialLoad(false);
      }
    };
    executeBanner();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [command]);

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [command]);

  const handleCommand = async (commandStr: string) => {
    const trimmedCommand = commandStr.trim();
    const initialHistoryItem = { command: trimmedCommand, outputs: [] };
    historyStore.addHistoryBuffer(initialHistoryItem);

    const [commandName, ...args] = trimmedCommand.split(" ");
    const result = await executeCommand(commandName, args, {
      themeUtils: themeStore, // Pass themeStore directly
      historyUtils: historyStore,
    });

    if (typeof result === "string") {
      historyStore.updateLastHistoryItem({
        command: trimmedCommand,
        outputs: [result],
      });
      setCommand("");
      setHistoryIndex(-1);
    } else if (result.isPrompt) {
      promptStore.setPromptBoolean(true);
      promptStore.setPromptMessage(result.message);

      historyStore.updateLastHistoryItem({
        command: trimmedCommand,
        outputs: [result.message],
      });

      setPromptState({
        isWaiting: true,
        message: result.message,
        command: trimmedCommand,
        onResponse: result.onResponse || null,
      });
      setCommand("");
    }
  };

  const handlePromptResponse = async (response: string) => {
    if (promptState.onResponse) {
      const result = await promptState.onResponse(response);
      const historyItem = {
        command: promptState.command,
        outputs: [result],
      };
      historyStore.addHistoryBuffer(historyItem);
    }
    setPromptState({
      isWaiting: false,
      message: "",
      command: "",
      onResponse: null,
    });
    setCommand("");
    promptStore.setPromptMessage("");
    promptStore.resetPromptBoolean();
  };

  const handleHistoryNavigation = (direction: "up" | "down") => {
    const historyLength = historyStore.history.length;
    if (historyLength === 0) return;

    if (direction === "up") {
      const newIndex =
        historyIndex < historyLength - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setCommand(historyStore.history[historyLength - 1 - newIndex].command);
    } else {
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(newIndex);
      setCommand(
        newIndex >= 0
          ? historyStore.history[historyLength - 1 - newIndex].command
          : ""
      );
    }
  };

  return (
    <div className={cn("flex w-full", className)}>
      {promptStore.isPrompt ? (
        <PromptInput
          inputRef={inputRef}
          className={className}
          command={command}
          onCommandChange={setCommand}
          onPromptResponse={handlePromptResponse}
        />
      ) : (
        <CommandInput
          inputRef={inputRef}
          className={className}
          command={command}
          onCommandChange={setCommand}
          onCommandSubmit={handleCommand}
          onHistoryNavigation={handleHistoryNavigation}
          placeholderText={
            promptState.isWaiting ? promptState.message : "Type a command..."
          }
        />
      )}
    </div>
  );
}
