export type IR = {
    name: string;
    commitID: string;
    microservices: Microservice[]
};

export type Microservice = {
    name: string;
    path: string;
    controllers: JClass[];
    services: JClass[];
    repositories: JClass[];
    entities: JClass[];
};

export type JClass = {
    packageName: string;
    name: string;
    path: string;
    fileType: string;
    implementedTypes: string[];
    classRoles: string;
    methods: Method[];
    fields: Field[];
    annotations: Annotation[];
    methodCalls: MethodCall[];
};

export type Method = {
    url: string | null;
    httpMethod: string;
    parameters: Field[];
    returnType: string;
    microserviceName: string;
    annotations: Annotation[];
    className: string;
    name: string;
    packageAndClassName: string;
};

export type Field = {
    type: string;
    name: string;
    packageAndClassName: string;
};

export type Annotation = {
    contents: string;
    name: string;
    packageAndClassName: string;
};

export type MethodCall = {
    url: string | null,
    httpMethod: string | null,
    objectName: string,
    objectType: string,
    calledFrom: string,
    parameterContents: string,
    microserviceName: string,
    className: string,
    name: string,
    packageAndClassName: string
};


// IR GRAPH CREATION

export type Endpoint = Method & {
    microservice: string;
};

export type RESTCall = MethodCall & {
    microservice: string;
};

export type Connection = {
    restCall: RESTCall;
    endpoint: Endpoint;
};

export type IREdge = {
    sourceMs: string;
    targetMs: string;
    connections: Connection[];
};

export type Graph = {
    nodes: Microservice[];
    edges: IREdge[];
}