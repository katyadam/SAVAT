package org.adamkattan.model.project;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ProjectSummary(
        @JsonProperty("totalSdgs") int totalServiceDependencyGraphs,
        @JsonProperty("totalContextMaps") int totalContextMaps,
        @JsonProperty("totalCallGraphInputs") int totalCallGraphInputs,
        @JsonProperty("totalCallGraphOutputs") int totalCallGraphOutputs,
        @JsonProperty("totalContextMapOutputs") int totalContextMapOutputs
) {
}
