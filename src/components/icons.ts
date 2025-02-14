import { IconType } from "react-icons";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaGitAlt, FaGithub, FaNodeJs, FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiDrizzle,
  SiExpress,
  SiHono,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type Icon = {
	id: string;
	name: string;
	icon: IconType;
};

export const icons = [
	{
		id: "typescript",
		name: "TypeScript",
		icon: SiTypescript,
	},
	{
		id: "javascript",
		name: "JavaScript",
		icon: SiJavascript,
	},
	{
		id: "react",
		name: "React",
		icon: FaReact,
	},
	{
		id: "nextjs",
		name: "Next.js",
		icon: RiNextjsFill,
	},
	{
		id: "tailwindcss",
		name: "Tailwind",
		icon: SiTailwindcss,
	},
	{
		id: "nodejs",
		name: "Node.js",
		icon: FaNodeJs,
	},
	{
		id: "express",
		name: "Express",
		icon: SiExpress,
	},
	{
		id: "hono",
		name: "Hono",
		icon: SiHono,
	},
	{
		id: "mongodb",
		name: "MongoDB",
		icon: SiMongodb,
	},
	{
		id: "postgresql",
		name: "PostgreSQL",
		icon: BiLogoPostgresql,
	},
	{
		id: "mysql",
		name: "MySQL",
		icon: SiMysql,
	},
	{
		id: "drizzle",
		name: "Drizzle",
		icon: SiDrizzle,
	},
	{
		id: "prisma",
		name: "Prisma",
		icon: SiPrisma,
	},
	{
		id: "git",
		name: "Git",
		icon: FaGitAlt,
	},
	{
		id: "github",
		name: "GitHub",
		icon: FaGithub,
	},
] satisfies Icon[];

