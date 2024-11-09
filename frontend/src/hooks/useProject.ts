import ProjectApi from "@/api/projects/projects"
import { useQuery } from "@tanstack/react-query"

export const useProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: () => ProjectApi.getAllProjects()
    });
}

export const useProject = (id: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => ProjectApi.getProjectById(id),
    });
}