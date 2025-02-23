package org.adamkattan.model.project;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ProjectSummary(
        @JsonProperty("totalAnalysisInputs") int totalAnalysisInputs,
        @JsonProperty("totalCallGraphInputs") int totalCallGraphInputs,
        @JsonProperty("totalCallGraphOutputs") int totalCallGraphOutputs
) {
}
