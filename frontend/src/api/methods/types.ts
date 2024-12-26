export type MicroserviceMethodNode = {
    name: string,
    bytecodeHash: string
}

export type MicroserviceNode = {
    name: string,
    methods: MicroserviceMethodNode[]
}
export type CompareMethodsResponse = {
    changedMs: MicroserviceNode[]
}
