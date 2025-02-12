const hostname = window.location.hostname;

type Command = {
  description: string;
  execute: (args: string[]) => Promise<string> | string;
}

const specialCommands: Record<string, Command> = {
  help: {
    description: "Display available commands and their descriptions",
    execute: () => {
      const allCommands = { ...specialCommands, ...commands };
      return Object.entries(allCommands)
        .map(([cmd, details]) => `${cmd} - ${details.description}`)
        .join('\n');
    }
  },
  about: {
    description: "Learn more about me and my background",
    execute: () => "I'm a software developer passionate about creating interactive experiences."
  },
  projects: {
    description: "View my portfolio of projects",
    execute: () => "Here are some of my notable projects: [Your projects here]"
  },
  skills: {
    description: "See my technical skills and expertise",
    execute: () => "My skills include: TypeScript, React, Node.js, and more"
  },
  contact: {
    description: "Get my contact information",
    execute: () => "You can reach me at: [Your contact info]"
  },
  banner: {
    description: "Greet the user",
    execute: () => "Welcome to my portfolio. Type 'help' for a list of commands."
  }
};

export const commands: Record<string, Command> = {
  hostname: {
    description: "Display the current hostname",
    execute: () => hostname
  },
  whoami: {
    description: "Display current user",
    execute: () => "guest"
  },
  date: {
    description: "Show current date and time",
    execute: () => new Date().toLocaleString()
  },
  echo: {
    description: "Print the given arguments",
    execute: (args) => args.join(" ")
  },
  clear: {
    description: "Clear the terminal screen",
    execute: () => ""
  },
  exit: {
    description: "Exit the terminal",
    execute: () => "Please close the tab to exit."
  },
  sudo: {
    description: "Attempt to run command with elevated privileges",
    execute: (args) => {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      return `Permission denied: unable to run the command '${args[0]}' as root.`;
    }
  }
};


// Helper function to execute a command
export const executeCommand = (commandName: string, args: string[] = []): Promise<string> | string => {
  const allCommands = { ...specialCommands, ...commands, };
  const command = allCommands[commandName];

  if (!command) {
    return `Command not found: ${commandName}. Type 'help' to see available commands.`;
  }

  return command.execute(args);
};
