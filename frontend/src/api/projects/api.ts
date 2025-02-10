import { axiosInstance } from "../config";
import { CreateProject, Project } from "./types";

const PROJECTS_PREFIX = "/projects"

async function getAllProjects(): Promise<Project[]> {
    const resp = await axiosInstance.get(PROJECTS_PREFIX);
    return resp.data;
}

async function getProjectById(id: string): Promise<Project> {
    const resp = await axiosInstance.get(`${PROJECTS_PREFIX}/${id}`);
    return resp.data;
}

async function createProject(project: CreateProject) {
    const resp = await axiosInstance.post(PROJECTS_PREFIX, project);
    return resp.data;
}

const ProjectApi = {
    getAllProjects,
    getProjectById,
    createProject
};

export default ProjectApi;