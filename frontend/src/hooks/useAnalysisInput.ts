import AnalysisInputApi from "@/api/inputs/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAnalysisInputs = (projectId: string) => {
    return useQuery({
        queryKey: ["inputs", projectId],
        queryFn: () => AnalysisInputApi.getProjectAnalysisInputs(projectId)
    });
}

export const useAnalyisiInputDelete = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteInput"],
        mutationFn: (payload: number) =>
            AnalysisInputApi.deleteAnalysisInput(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["inputs", projectId],
            }),
    });
};

export const useAnalysisInputSummary = (id: number | null) => {
    return useQuery({
        queryKey: ["ai_summary", id],
        queryFn: () => id ? AnalysisInputApi.getSummary(id) : Promise.reject("No ID provided"),
        enabled: !!id,
    })
}
