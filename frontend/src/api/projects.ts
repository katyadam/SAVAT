import { axiosInstance } from "./config";

const PROJECTS_PREFIX = "/projects"

export type Project = {
    id: number,
    projectName: string
};

async function getAllProjects(): Promise<Project[]> {
    const resp = await axiosInstance.get(PROJECTS_PREFIX);
    return resp.data;
}

async function getProjectById(id: string): Promise<Project> {
    const resp = await axiosInstance.get(`${PROJECTS_PREFIX}/${id}`);
    return resp.data;
}

const ProjectApi = {
    getAllProjects,
    getProjectById
};

export default ProjectApi;