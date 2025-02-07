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
    isEntryPoint: boolean;
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
    callGraph: CallGraph;
    createdAt: string
}

export type CallGraphInputSimple = Omit<CallGraphInput, 'callGraph'>;