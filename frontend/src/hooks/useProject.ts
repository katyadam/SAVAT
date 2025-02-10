import CallGraphsApi from "@/api/callgraphs/api";
import AnalysisInputApi from "@/api/inputs/api";
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

export const useCallGraphInputCreate = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: CallGraphsApi.createCallGraphInput,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["callgraphs", projectId] })
        }
    })
}

export const useAnalysisInputCreate = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: AnalysisInputApi.createAnalysisInput,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inputs", projectId] })
        }
    })
}