import ContextMapApi from "@/api/context-maps/api";
import { ChangedDto, Link } from "@/api/context-maps/types";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"

export const useContextMap = (id: string) => {
    return useQuery({
        queryKey: ["contextMap", id],
        queryFn: () => ContextMapApi.getContextMap(id)
    });
}

export const useContextMapChanges = (id: string): UseQueryResult<ChangedDto[], Error> => {
    return useQuery({
        queryKey: ["contextMapChanges", id],
        queryFn: () => ContextMapApi.getContextMapChanges(id)
    });
}

export const useContextMapChange = (changeId: string): UseQueryResult<ChangedDto, Error> => {
    return useQuery({
        queryKey: ["contextMapChange", changeId],
        queryFn: () => ContextMapApi.getContextMapChange(changeId),
        enabled: !!changeId && changeId !== "None",
    });
}

export const useContextMapSummary = (id: number | null) => {
    return useQuery({
        queryKey: ["contextMapSummary", id],
        queryFn: () => id ? ContextMapApi.getSummary(id) : Promise.reject("No ID provided"),
        enabled: !!id,
    })
}

export const useContextMapCreate = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ContextMapApi.createContextMap,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contextMaps", projectId] })
        }
    })
}

export const useContextMapDelete = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["coontextMapDelete"],
        mutationFn: (payload: number) =>
            ContextMapApi.deleteContextMap(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["contextMaps", projectId],
            })
            queryClient.invalidateQueries({
                queryKey: ["contextMapOutputs", projectId],
            })
            queryClient.invalidateQueries({
                queryKey: ["projectSummary", projectId],
            })
        }
    });
};

export const useContextMapCompareManually = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (links: Link[]) =>
            ContextMapApi.compareContextMapsLinksManually(id, links),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contextMapChanges", id] });
        },
    })
}

export const useContextMapCompare = (srcId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (targetId: string) =>
            ContextMapApi.compareContextMapsLinks(srcId, targetId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contextMapChanges", srcId] });
        },
    })
}