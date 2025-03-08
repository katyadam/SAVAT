import CallGraphsApi from "@/api/callgraphs/api";
import ProjectApi from "@/api/projects/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ProjectApi.createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        }
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ProjectApi.deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        }
    })
}

export const useCallGraphInputCreate = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: CallGraphsApi.createCallGraphInput,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["callgraphs", projectId] })
        }
    })
}

export const useProjectSummary = (projectId: string) => {
    return useQuery({
        queryKey: ["projectSummary", projectId],
        queryFn: () => ProjectApi.getSummary(projectId)
    });
}

export const useProjectContextMaps = (projectId: string) => {
    return useQuery({
        queryKey: ["contextMaps", projectId],
        queryFn: () => ProjectApi.getProjectContextMaps(projectId)
    });
}

export const useProjectSDGs = (projectId: string) => {
    return useQuery({
        queryKey: ["sdgs", projectId],
        queryFn: () => ProjectApi.getProjectSDGs(projectId)
    });
}