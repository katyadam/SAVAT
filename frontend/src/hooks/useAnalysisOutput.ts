import EntitiesApi from "@/api/entities/entities";
import { EntityLink } from "@/api/entities/types";
import MethodsApi from "@/api/methods/methods";
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