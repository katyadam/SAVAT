import CallGraphsApi from "@/api/callgraphs/api";
import { useQuery } from "@tanstack/react-query";

export const useCallGraphInput = (callGraphId: string) => {
    return useQuery({
        queryKey: ["callgraph", callGraphId],
        queryFn: () => CallGraphsApi.getCallGraphInputById(callGraphId)
    });
}

export const useProjectCallGraphInputs = (projectId: string) => {
    return useQuery({
        queryKey: ["callgraphs", projectId],
        queryFn: () => CallGraphsApi.getCallGraphInputsByProjectId(projectId)
    });
}
