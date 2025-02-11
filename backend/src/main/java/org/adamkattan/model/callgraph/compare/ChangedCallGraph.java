package org.adamkattan.model.callgraph.compare;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.callgraph.CallGraphCall;
import org.adamkattan.model.callgraph.CallGraphMethod;

import java.util.List;

public record ChangedCallGraph(
        @JsonProperty("changedMethods") ChangedCallGraphMethod changedMethods,
        @JsonProperty("dependencyMethods") CallGraphMethod dependencyMethods,
        @JsonProperty("calls") List<CallGraphCall> calls
) {
}
