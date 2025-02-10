export type Project = {
    id: number,
    projectName: string
};

export type CreateProject = Omit<Project, "id">