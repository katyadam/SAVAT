import { CallGraphCall, CallGraphMethod } from "./types";

export const indexCallGraphMethods = (methods: CallGraphMethod[]): Map<string, CallGraphMethod> => {
    const methodMap = new Map<string, CallGraphMethod>();
    methods.forEach(method => {
        methodMap.set(method.methodSignature, method);
    });
    return methodMap;
};

export const indexCallGraphCalls = (calls: CallGraphCall[]): Map<string, CallGraphCall> => {
    const callsMap = new Map<string, CallGraphCall>();
    calls.forEach(call => {
        callsMap.set(`${call.httpMethod}:${call.source}__${call.target}`, call);
    });
    return callsMap
}