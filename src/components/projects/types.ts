type TechStack = string;

export type Project = {
	title: string;
	description: string;
	techStack: TechStack[];
	repo?: string;
	link?: string;
};
