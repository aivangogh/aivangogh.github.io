export type Command = {
  command: string;
  outputs: string[];
}

export type CommandArgs = {
  themeUtils?: {
    getColorSchemeNames: () => string[];
    getColorSchemeByName: (name: string) => any;
    setCurrentColorScheme: (name: string) => void;
  };
};

export type CommandUtil = {
  description: string;
  execute: (args: string[], commandArgs?: CommandArgs) => Promise<string> | string;
};

export type GistCommand = {
  description: string;
  content: string;
}
