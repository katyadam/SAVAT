package org.adamkattan.model.callgraph.compare;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CallGraphOutputRequest(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("sourceCallGraphInputId") Long sourceCallGraphInputId,
        @JsonProperty("targetCallGraphInputId") Long targetCallGraphInputId
) {
}
