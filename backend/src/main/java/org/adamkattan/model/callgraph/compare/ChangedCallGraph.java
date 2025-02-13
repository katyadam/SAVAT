package org.adamkattan.model.callgraph.compare;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.callgraph.CallGraphCall;

import java.util.List;

public record ChangedCallGraph(
        @JsonProperty("methods") List<ChangedCallGraphMethod> methods,
        @JsonProperty("calls") List<CallGraphCall> calls
) {
}
