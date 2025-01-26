import { CallGraphMethod } from "./types";

export const indexCallGraphMethods = (methods: CallGraphMethod[]): Map<string, CallGraphMethod> => {
    const methodMap = new Map<string, CallGraphMethod>();
    methods.forEach(method => {
        methodMap.set(method.methodSignature, method);
    });
    return methodMap;
};