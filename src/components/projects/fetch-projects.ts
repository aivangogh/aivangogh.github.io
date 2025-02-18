import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Project } from "./types";

export function useGetProjects() {
	const query = useQuery({
		queryKey: ["projects"],
		queryFn: async () => {
			const res = await axios.get(
				"https://api.github.com/gists/ffe896ca9903aec5a154ee528fef3778",
			);
			if (res.status !== 200) {
				throw new Error("Failed to fetch projects");
			}
			const data = res.data.files["projects"].content;

			try {
				const projects = JSON.parse(data) as Project[];
				return projects;
			} catch (error) {
        console.log(error);
				throw new Error("Failed to parse projects data");
			}
		},
	});
	return query;
}
