import CommGraphApi from "@/api/communication-graphs/api";
import { CommGraphLink } from "@/api/communication-graphs/types";
import EntitiesApi from "@/api/entities/api";
import { EntityLink } from "@/api/entities/types";
import MethodsApi from "@/api/methods/api";
import { MicroserviceNode } from "@/api/methods/types";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCompareMethods = (analysisInputId: string) => {
    return useMutation({
        mutationKey: ["compareMethods"],
        mutationFn: (microservices: MicroserviceNode[]) =>
            MethodsApi.compareMethods(analysisInputId, microservices)
    })
}

export const useCompareEntitiesLinks = (analysisInputId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (links: EntityLink[]) =>
            EntitiesApi.compareEntitiesLinks(analysisInputId, links),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["entitiesDiffs"] });
        },
    })
}

export const useCompareCommGraphLinks = (analysisInputId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (links: CommGraphLink[]) =>
            CommGraphApi.compareCommGraphLinks(analysisInputId, links),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["commGraphDiffs"] });
        },
    })
}