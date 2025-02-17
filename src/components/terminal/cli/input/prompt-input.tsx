import { KeyboardEvent, RefObject } from "react";
import { cn } from "../../../../lib/utils";
import { useThemeStore } from "../../../../stores/useThemeStore";

type PromptInputProps = {
  className?: string;
  inputRef: RefObject<HTMLInputElement>;
  command: string;
  onCommandChange: (value: string) => void;
  onPromptResponse: (response: string) => Promise<void>;
};

export function PromptInput({
  className,
  inputRef,
  command,
  onCommandChange,
  onPromptResponse,
}: PromptInputProps) {
  const themeStore = useThemeStore();

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await onPromptResponse(command);
    }
  };

  return (
    <input
      id="prompt-input"
      ref={inputRef}
      aria-label="Prompt input"
      className={cn("w-full bg-transparent outline-none", className)}
      style={{ color: themeStore.getTerminalColorScheme()?.foreground }}
      value={command}
      onChange={(e) => onCommandChange(e.target.value)}
      onKeyDown={handleKeyDown}
      spellCheck="false"
    />
  );
}
