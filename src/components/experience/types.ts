type TechStack = string;

export type Experience = {
	company: string;
	project: string;
	role: string;
	period: string;
	description: string[];
	techStack: TechStack[];
	repo?: string;
	link?: string;
  imageLink?: string;
};
