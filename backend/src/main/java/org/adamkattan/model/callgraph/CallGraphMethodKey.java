package org.adamkattan.model.callgraph;

public record CallGraphMethodKey(
        String methodSignature
) {
    public CallGraphMethodKey(CallGraphMethod method) {
        this(method.methodSignature());
    }
}