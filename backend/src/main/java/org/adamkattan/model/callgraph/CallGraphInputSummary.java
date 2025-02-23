package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CallGraphInputSummary(
        @JsonProperty("totalCallGraphOutputs") int totalCallGraphOutputs
) {
}
