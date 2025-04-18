import { ciaAI } from "../config";
import { Project } from "../projects/types";

export const get_element_gh_url = async (name: string, ms: string, classPath: string, branch: string, project: Project) => {

    const dataResp = await ciaAI.post("/github", {
        "methodName": name,
        "ms": ms,
        "classPath": classPath,
        "branch": branch,
        "owner": project.owner,
        "repository": project.repository
    });

    return dataResp.data;
}