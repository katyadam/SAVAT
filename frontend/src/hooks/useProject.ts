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

export const useCallGraphInputCreate = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: CallGraphsApi.createCallGraphInput,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["callgraphs", projectId] })
        }
    })
}