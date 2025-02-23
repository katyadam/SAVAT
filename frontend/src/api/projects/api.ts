import { axiosInstance } from "../config";
import { CreateProject, Project, ProjectSummary } from "./types";

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

async function deleteProject(id: string) {
    const resp = await axiosInstance.delete(`${PROJECTS_PREFIX}/${id}`);
    return resp.data;
}

async function getSummary(id: string): Promise<ProjectSummary> {
    const resp = await axiosInstance.get(`${PROJECTS_PREFIX}/${id}/summary`);
    return resp.data;
}

const ProjectApi = {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    getSummary
};

export default ProjectApi;