import CallGraphsApi from "@/api/callgraphs/api";
import { ChangeImpactAnalysisPayload } from "@/api/callgraphs/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProjectsCallGraphOutputs = (projectId: string) => {
  return useQuery({
    queryKey: ["callGraphOutputs", projectId],
    queryFn: () => CallGraphsApi.getAllProjectsCallGraphOuputs(projectId),
  });
};

export const useCallGraphOutput = (id: string) => {
  return useQuery({
    queryKey: ["changedCallGraph", id],
    queryFn: () => CallGraphsApi.getChangedCallGraphById(id),
  });
};

export const useCallGraphOutputDelete = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteOutput"],
    mutationFn: (payload: number) =>
      CallGraphsApi.deleteCallGraphOutput(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["callGraphOutputs", projectId],
      }),
  });
};

export const useCallGraphChangeImpactAnalysis = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cia"],
    mutationFn: (payload: ChangeImpactAnalysisPayload) =>
      CallGraphsApi.changeImpactAnalysis(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["callGraphOutputs", projectId],
      });
    },
  });
};
