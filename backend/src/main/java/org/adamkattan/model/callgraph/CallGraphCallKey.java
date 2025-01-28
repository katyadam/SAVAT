package org.adamkattan.model.callgraph;

public record CallGraphCallKey(
        String source
) {
    public CallGraphCallKey(CallGraphCall callGraphCall) {
        this(callGraphCall.source());
    }
}
