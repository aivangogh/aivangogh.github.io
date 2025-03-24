import { cn } from "@/lib/utils";
import { useHistoryStore } from "@/stores/useHistoryStore";
import { usePromptStore } from "@/stores/usePromptStore";
import { useCLIContext } from "@/contexts/cli";
import { executeCommand } from "@/utils/command";
import { memo, RefObject, useEffect, useState } from "react";
import { CommandInput } from "./input/command-input";
import { PromptInput } from "./input/prompt-input";

type Props = {
  className?: string;
  inputRef: RefObject<HTMLInputElement>;
};

const Input = memo(({ className, inputRef }: Props) => {
  const { command, setCommand } = useCLIContext();
  const historyStore = useHistoryStore();
  const promptStore = usePromptStore();

  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyboardShortcuts = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "c") {
      if (promptStore.isPrompt) {
        historyStore.addHistoryBuffer({
          command: promptStore.prompt.command,
          outputs: ["Operation cancelled."],
        });
        promptStore.cancelPrompt();
        setCommand("");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardShortcuts);
    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcuts);
    };
  }, [promptStore.isPrompt, promptStore.prompt.command]);

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [command, inputRef]);

  const handleCommand = async (commandStr: string) => {
    const trimmedCommand = commandStr.trim();
    const initialHistoryItem = { command: trimmedCommand, outputs: [] };
    historyStore.addHistoryBuffer(initialHistoryItem);

    const [commandName, ...args] = trimmedCommand.split(" ");
    const result = await executeCommand(commandName, args);

    if (typeof result === "string") {
      historyStore.updateLastHistoryItem({
        command: trimmedCommand,
        outputs: [result],
      });
      setCommand("");
      setHistoryIndex(-1);
    } else if (result.isPrompt) {
      promptStore.setPromptBoolean(true);
      promptStore.setPrompt({
        isWaiting: true,
        message: result.message,
        command: trimmedCommand,
        onResponse: result.onResponse || null,
      });
      setCommand("");
    }
  };

  const handlePromptResponse = async (response: string) => {
    const currentPrompt = promptStore.prompt;

    if (currentPrompt.onResponse) {
      try {
        const result = await currentPrompt.onResponse(response);
        const historyItem = {
          command: currentPrompt.command,
          outputs: [result],
        };
        historyStore.addHistoryBuffer(historyItem);
      } catch (error) {
        console.error("Error handling prompt response:", error);
        historyStore.addHistoryBuffer({
          command: currentPrompt.command,
          outputs: ["Error processing response"],
        });
      }
    }

    promptStore.resetPrompt();
    setCommand("");
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
          : "",
      );
    }
  };

  return (
    <div className={cn("flex w-full", className)}>
      {promptStore.isPrompt && promptStore.prompt.isWaiting ? (
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
            promptStore.prompt.isWaiting
              ? promptStore.prompt.message
              : "Type a command..."
          }
        />
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
