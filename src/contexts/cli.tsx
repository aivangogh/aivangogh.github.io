import { createContext, ReactNode, useContext } from "react";
import { Theme } from "../types/theme";

type ColorScheme = {
  name: string;
} & Theme;

export type CLIContextType = {
  command: string;
  setCommand: (command: string) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  history: string[];
};

export const CLIContext = createContext<CLIContextType>({
  command: "",
  setCommand: () => { },
  colorScheme: {} as ColorScheme,
  setColorScheme: () => {},
  history: [],
});

type CLIProviderProps = {
  children: ReactNode;
};

export const CLIContractProvider = ({ children }: CLIProviderProps) => {
  const contextValue = {
    command: "",
    setCommand: () => { },
    colorScheme: {} as ColorScheme,
    setColorScheme: () => { },
    history: [],
  };

  return (
    <CLIContext.Provider value={contextValue}>{children}</CLIContext.Provider>
  );
};

export const useCLIContract = () => {
  return useContext(CLIContext);
};
