import CallGraphsApi from "@/api/callgraphs/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useMethodReachability = (inputId: string, variant: "inputs" | "outputs") => {
    return useMutation({
        mutationKey: ["method-reachability", inputId],
        mutationFn: (payload: string) => CallGraphsApi.computeMethodReachabilityForInput(inputId, variant, payload)
    })
}

export const useCallGraphInputDelete = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteInput"],
        mutationFn: (payload: number) =>
            CallGraphsApi.deleteCallGraphInput(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["callgraphs", projectId],
            })
            queryClient.invalidateQueries({
                queryKey: ["callGraphOutputs", projectId],
            })
            queryClient.invalidateQueries({
                queryKey: ["projectSummary", projectId],
            })
        },
    });
};

export const useCallGraphInputSummary = (id: number | null) => {
    return useQuery({
        queryKey: ["cg_input_summary", id],
        queryFn: () => id ? CallGraphsApi.getSummary(id) : Promise.reject("No ID provided")
    });
}
