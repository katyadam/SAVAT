package org.adamkattan.model.sdg;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ServiceDependencyGraphSummary(
        @JsonProperty("totalChangedSdgs") int totalChangedSdgs
) {
}
