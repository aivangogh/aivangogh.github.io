import { CommandUtil } from "@/types/command";

export const neofetch: CommandUtil = {
  description: "Display system information about Ivan",
  execute: () => {
    return `
      ██╗██╗   ██╗ █████╗ ███╗   ██╗
      ██║██║   ██║██╔══██╗████╗  ██║
      ██║██║   ██║███████║██╔██╗ ██║
      ██║╚██╗ ██╔╝██╔══██║██║╚██╗██║
      ██║ ╚████╔╝ ██║  ██║██║ ╚████║
      ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝
      -----------------
      Name: Ivan P. Gemota
      Title: Full-Stack Developer
      Skills: TypeScript, React, Node.js, TailwindCSS, Node.js, PostgreSQL
      GitHub: https://github.com/aivangogh
      LinkedIn: https://linkedin.com/in/aivangogh
      Email: ivangemota23@gmail.com
    `;
  },
}
