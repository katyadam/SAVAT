import ContextMapApi from "@/api/context-maps/api";
import { ChangeImpactAnalysisPayload } from "@/api/context-maps/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProjectsContextMapOutputs = (projectId: string) => {
  return useQuery({
    queryKey: ["contextMapOutputs", projectId],
    queryFn: () => ContextMapApi.getProjectContextMapOutputs(projectId),
  });
};

export const useContextMapOutput = (id: string) => {
  return useQuery({
    queryKey: ["contextMapOutput", id],
    queryFn: () => ContextMapApi.getContextMapOutputById(id),
  });
};

export const useContextMapOutputDelete = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteContextMapOutput"],
    mutationFn: (payload: number) =>
      ContextMapApi.deleteContextMapOutputById(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contextMapOutputs", projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contextMapSummary", projectId],
      });
    },
  });
};

export const useContextMapChangeImpactAnalysis = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contextMapCIA"],
    mutationFn: (payload: ChangeImpactAnalysisPayload) =>
      ContextMapApi.changeImpactAnalysis(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contextMapOutputs", projectId],
      });
    },
  });
};
