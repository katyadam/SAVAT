export type CallGraph = {
    methods: CallGraphMethod[],
    calls: CallGraphCall[]
}

export type CallGraphMethod = {
    id: number;
    name: string;
    type: string;
    parameters: string[];
    returnType: string;
    display: string;
    flags: string;
    bytecodeHash: string;
    microservice: string;
    endpointURI: string;
    httpMethod: string;
    endpointMethod: boolean;
    entryPoint: boolean;
    methodSignature: string;
};

export type CallGraphCall = {
    source: string;
    target: string;
    isInterserviceCall: boolean;
    httpMethod: string
}

export type CallGraphInput = {
    id: number;
    projectId: number;
    version: string;
    commitHash: string;
    branch: string;
    callGraph: CallGraph;
    createdAt: string
}

export type CallGraphInputSimple = Omit<CallGraphInput, 'callGraph'>;
export type CreateCallGraphInput = Omit<CallGraphInput, 'createdAt' | 'id'>


// Call Graph Change Impact Analysis Types

export type CallGraphOutputSimple = {
    id: number,
    projectId: number,
    sourceInput: CallGraphInputSimple,
    targetInput: CallGraphInputSimple,
    createdAt: string
}

export enum TypeOfChange {
    ADDED,
    MODIFIED,
    REMOVED,
    NONE
}

export type ChangedCallGraphMethod = CallGraphMethod & {
    typeOfChange: TypeOfChange
}

export type ChangedCallGraph = {
    methods: ChangedCallGraphMethod[],
    calls: CallGraphCall[]
}

export type GenericCallGraph = ChangedCallGraph | CallGraph

export type ChangeImpactAnalysisPayload = {
    projectId: string,
    sourceCallGraphInputId: number,
    targetCallGraphInputId: number
}

export type CallGraphInputSummary = {
    totalCallGraphOutputs: number;
}