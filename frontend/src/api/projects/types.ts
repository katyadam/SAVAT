export type Project = {
    id: number;
    name: string;
    owner: string;
    repository: string;
    accessToken: string | null;
};

export type CreateProject = Omit<Project, "id">

export type ProjectSummary = {
    totalSdgs: number;
    totalContextMaps: number;
    totalCallGraphInputs: number;
    totalCallGraphOutputs: number;
}