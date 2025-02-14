import { icons } from "../components/icons";

export function getIconById(id: string) {
	return icons.find((icon) => icon.id === id);
}
