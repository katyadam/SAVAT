import { axiosInstance } from "../config";
import { Project } from "../projects/types";

const lookup_function = async (element: string, branch: string, project: Project) => {
    const gh_url = `https://api.github.com/search/code?q=${element}+repo:${project.owner}/${project.repository}`;
    const headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": project.accessToken ? `token ${project.accessToken}` : null
    }
    const resp = await axiosInstance.get(gh_url, { headers: headers });
    if (!resp.data.items || resp.data.items.length === 0) {
        console.log(`Function '${element}' not found in ${project.owner}/${project.repository}.`);
        return;
    }

    const fileInfo = resp.data.items[0];
    const filePath = fileInfo.path;

    const fileUrl = `https://github.com/${project.owner}/${project.repository}/blob/${branch}/${filePath}`;

    const fileDataUrl = `https://raw.githubusercontent.com/${project.owner}/${project.repository}/${branch}/${filePath}`;

    const dataResp = await axiosInstance.get(fileDataUrl, { headers: headers });
    const fileContent = dataResp.data;
    const lines = fileContent.split("\n");

    const lineNumber = lines.findIndex((line: string) => new RegExp(`\\b${element}\\b`).test(line)) + 1;
    if (lineNumber > 0) {
        const finalUrl = `${fileUrl}#L${lineNumber}`;
    } else {
        console.log(`Function '${element}' found in file '${filePath}', but line number could not be determined.`);
    }

}