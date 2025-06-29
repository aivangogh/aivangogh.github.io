type TechStack = string;

export type Project = {
	title: string;
	description: string;
  private: boolean;
	techStack: TechStack[];
	repo?: string;
	link?: string;
  imageLink?: string;
};
