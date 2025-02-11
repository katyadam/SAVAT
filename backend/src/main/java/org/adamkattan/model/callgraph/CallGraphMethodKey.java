package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public record CallGraphMethodKey(
        @JsonProperty("methodSignature") String methodSignature
) {
    public CallGraphMethodKey(CallGraphMethod method) {
        this(method.methodSignature());
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CallGraphMethodKey that = (CallGraphMethodKey) o;
        return Objects.equals(methodSignature, that.methodSignature);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(methodSignature);
    }
}