import { axiosInstance } from "../config";
import { Project } from "../projects/types";

const lookup_function = async (element: string, project: Project) => {
    const gh_url = `https://api.github.com/search/code?q=${element}+repo:${project.owner}/${project.repository}`;
    const headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": project.accessToken ? `token ${project.accessToken}` : null
    }
    const resp = await axiosInstance.get(gh_url, { headers: headers });

}