package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record CallGraph(
        @JsonProperty("methods") List<CallGraphMethod> methods,
        @JsonProperty("calls") List<CallGraphCall> calls
) {
}
