export type Project = {
    id: number,
    projectName: string
};

export type CreateProject = Omit<Project, "id">

export type ProjectSummary = {
    totalSdgs: number;
    totalContextMaps: number;
    totalCallGraphInputs: number;
    totalCallGraphOutputs: number;
}