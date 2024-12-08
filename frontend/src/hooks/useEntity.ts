import EntitiesApi from "@/api/entities/entities";
import { EntitiesDiff } from "@/api/entities/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query"

export const useEntities = (analysisInputId: string) => {
    return useQuery({
        queryKey: [],
        queryFn: () => EntitiesApi.getEntities(analysisInputId)
    });
}

export const useEntitiesDiffs = (analysisInputId: string): UseQueryResult<EntitiesDiff[], Error> => {
    return useQuery({
        queryKey: ["entitiesDiffs"],
        queryFn: () => EntitiesApi.getEntitiesDiffs(analysisInputId)
    });
}
export const useEntitiesDiff = (id: string): UseQueryResult<EntitiesDiff, Error> => {
    return useQuery({
        queryKey: ["entityDiff", id],
        queryFn: () => EntitiesApi.getEntitiesDiff(id)
    });
}