package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public record CallGraph(
        @JsonProperty("methods") List<CallGraphMethod> methods,
        @JsonProperty("calls") List<CallGraphCall> calls
) {
    @JsonIgnore
    public Map<CallGraphMethodKey, CallGraphMethod> getMethodsMap() {
        return methods.stream()
                .collect(Collectors.toMap(
                        CallGraphMethodKey::new,
                        method -> method
                ));
    }

    @JsonIgnore
    public Map<CallGraphCallKey, CallGraphCall> getCallsMap() {
        return calls.stream()
                .collect(Collectors.toMap(
                        CallGraphCallKey::new,
                        call -> call
                ));
    }

    @JsonIgnore
    public List<CallGraphCall> getMethodCalls(CallGraphMethodKey methodKey) {
        return this.calls().stream()
                .filter(call -> call.source().equals(methodKey.methodSignature()))
                .toList();
    }
}
