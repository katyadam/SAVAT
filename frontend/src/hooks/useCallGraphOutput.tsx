import CallGraphsApi from "@/api/callgraphs/api";
import { useQuery } from "@tanstack/react-query";

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
