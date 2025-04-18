import { ciaAI } from "../config";
import { ContextMapDto } from "../context-maps/types";
import { SDGDto } from "../sdgs/types";
import { CreateProject, Project, ProjectSummary } from "./types";

const PROJECTS_PREFIX = "/projects"

async function getAllProjects(): Promise<Project[]> {
    const resp = await ciaAI.get(PROJECTS_PREFIX);
    return resp.data;
}

async function getProjectById(id: string): Promise<Project> {
    const resp = await ciaAI.get(`${PROJECTS_PREFIX}/${id}`);
    return resp.data;
}

async function createProject(project: CreateProject) {
    const resp = await ciaAI.post(PROJECTS_PREFIX, project);
    return resp.data;
}

async function deleteProject(id: string) {
    const resp = await ciaAI.delete(`${PROJECTS_PREFIX}/${id}`);
    return resp.data;
}

async function getSummary(id: string): Promise<ProjectSummary> {
    const resp = await ciaAI.get(`${PROJECTS_PREFIX}/${id}/summary`);
    return resp.data;
}

async function getProjectContextMaps(id: string): Promise<ContextMapDto[]> {
    const resp = await ciaAI.get(`${PROJECTS_PREFIX}/${id}/context-maps`);
    return resp.data;
}

async function getProjectSDGs(id: string): Promise<SDGDto[]> {
    const resp = await ciaAI.get(`${PROJECTS_PREFIX}/${id}/sdgs`);
    return resp.data;
}

const ProjectApi = {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    getSummary,
    getProjectContextMaps,
    getProjectSDGs
};

export default ProjectApi;