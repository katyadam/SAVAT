package org.adamkattan.model.input;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AnalysisInputSummary(
        @JsonProperty("totalEntitiesComparisons") int totalEntitiesComparisons,
        @JsonProperty("totalGraphComparisons") int totalGraphComparisons
) {
}
