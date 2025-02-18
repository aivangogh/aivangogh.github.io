import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Experience } from "./types";

export function useGetExperiences() {
	const query = useQuery({
		queryKey: ["experiences"],
		queryFn: async () => {
			const res = await axios.get(
				"https://api.github.com/gists/ad9a59b285a9b165bbf2a5e6872f8a0a",
			);
			if (res.status !== 200) {
				throw new Error("Failed to fetch experiences");
			}
			const data = res.data.files["experiences"].content;

			try {
				const experiences = JSON.parse(data) as Experience[];
				return experiences;
			} catch (error) {
        console.log(error);
				throw new Error("Failed to parse experiences data");
			}
		},
	});
	return query;
}
