import { axiosInstance } from "../config";
import { Project } from "./types";

const PROJECTS_PREFIX = "/projects"

async function getAllProjects(): Promise<Project[]> {
    console.log(PROJECTS_PREFIX);
    const resp = await axiosInstance.get(PROJECTS_PREFIX);
    console.log(resp);
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