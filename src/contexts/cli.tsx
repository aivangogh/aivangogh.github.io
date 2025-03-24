import { createContext, ReactNode, useContext, useRef } from "react";

export type CLIContextType = {
  cliRef: React.RefObject<HTMLDivElement>;
};

export const CLIContext = createContext<CLIContextType>({
  cliRef: useRef<HTMLDivElement>(null),
});

type CLIProviderProps = {
  children: ReactNode;
};

export const CLIContextProvider = ({ children }: CLIProviderProps) => {
  const cliRef = useRef<HTMLDivElement>(null);

  return (
    <CLIContext.Provider value={{ cliRef }}>{children}</CLIContext.Provider>
  );
};

export const useCLIContext = () => {
  return useContext(CLIContext);
};
