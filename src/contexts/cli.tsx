import { createContext, ReactNode, useContext, useState } from "react";

export type CLIContextType = {
  inputRef: React.RefObject<HTMLInputElement>;
  command: string;
  setCommand: (value: string) => void;
  setInputRef: (ref: React.RefObject<HTMLInputElement>) => void;
};

export const CLIContext = createContext<CLIContextType>({
  inputRef: { current: null },
  command: "",
  setCommand: () => {},
  setInputRef: () => {},
});

type CLIProviderProps = {
  children: ReactNode;
};

export const CLIContextProvider = ({ children }: CLIProviderProps) => {
  const [inputRef, setInputRef] = useState<React.RefObject<HTMLInputElement>>({ current: null });
  const [command, setCommand] = useState<string>("");

  return (
    <CLIContext.Provider value={{ inputRef, command, setCommand, setInputRef }}>
      {children}
    </CLIContext.Provider>
  );
};

export const useCLIContext = () => {
  const context = useContext(CLIContext);

  if (!context) {
    throw new Error("useCLIContext must be used within a CLIContextProvider");
  }

  return context;
};
