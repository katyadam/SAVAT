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

export const useContextMapSummary = (id: string) => {
    return useQuery({
        queryKey: ["contextMapSummary", id],
        queryFn: () => ContextMapApi.getSummary(id)
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
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["contextMaps", projectId],
            }),
    });
};

export const useContextMapCompare = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (links: Link[]) =>
            ContextMapApi.compareContextMapsLinks(id, links),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contextMapChanges", id] });
        },
    })
}