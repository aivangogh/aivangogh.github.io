import { CommandUtil } from "../../types/command";

export const specialCommands: Record<string, CommandUtil> = {
	about: {
		description: "Learn more about me and my background",
		execute: () =>
			"\n\tHello! I’m Ivan P.Gemota, a dedicated full- stack developer with a passion for crafting innovative and impactful digital solutions. With a solid foundation in web development, I bring expertise in a diverse array of programming languages and frameworks, enabling me to tackle complex challenges and deliver high- quality results.\n\n\tI thrive on continuous learning and am always exploring emerging technologies and best practices to refine my skills and stay ahead in the ever - evolving tech landscape.\n",
	},
	projects: {
		description: "View my portfolio of projects",
		execute: () => "Here are some of my notable projects: (to be added)",
	},
	skills: {
		description: "See my technical skills and expertise",
		execute: () =>
			"My skills include:\n\nTypeScript\nJavaScript\nReact\nNext.js\nTailwind CSS\nZustand\nNode.js\nExpress.js\nMongoDB\nPostgreSQL\nMySQL\nDizzle ORM\nPrisma ORM\nGit",
	},
	contact: {
		description: "Get my contact information",
		execute: () =>
			"You can reach me at:\n\nEmail: ivangemota23@gmail.com\nLinkedIn: https://www.linkedin.com/in/aivangogh/\nGitHub: https://github.com/aivangogh\n\nLooking forward to connecting with you!",
	},
	banner: {
		description: "Greet the user",
		execute: () =>
			"Welcome to my portfolio. Type 'help' for a list of commands.",
	},
};
