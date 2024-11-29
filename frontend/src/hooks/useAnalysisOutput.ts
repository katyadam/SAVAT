import { EntityLink } from "@/api/entities/types";
import { MicroserviceNode } from "@/api/methods/types";
import AnalysisOutputApi from "@/api/outputs/analysisOutputs";
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