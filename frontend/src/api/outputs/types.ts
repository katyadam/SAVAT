import { ChangedEntityLink } from "../entities/types"
import { MicroserviceNode } from "../methods/types"

export type CompareMethodsResponse = {
    changedMs: MicroserviceNode[]
}

export type CompareEntitiesLinksResponse = {
    changedLinks: ChangedEntityLink[]
}
