package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CallGraphMethodKey(
        @JsonProperty("methodSignature") String methodSignature
) {
    public CallGraphMethodKey(CallGraphMethod method) {
        this(method.methodSignature());
    }
}