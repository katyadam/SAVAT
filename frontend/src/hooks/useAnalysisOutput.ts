import AnalysisOutputApi from "@/api/analysisOutputs";
import { EntityLink } from "@/api/entities";
import { MicroserviceNode } from "@/api/methods";
import { useMutation } from "@tanstack/react-query"

export const useCompareMethods = (analysisInputId: string) => {
    return useMutation({
        mutationKey: ["compareMethods"],
        mutationFn: (microservices: MicroserviceNode[]) =>
            AnalysisOutputApi.compareMethods(analysisInputId, microservices)
    })
}

export const useCompareEntitiesLinks = (analysisInputId: string) => {
    return useMutation({
        mutationKey: ["compareEntitiesLinks"],
        mutationFn: (links: EntityLink[]) =>
            AnalysisOutputApi.compareEntitiesLinks(analysisInputId, links)
    })
}