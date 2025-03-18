package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ContextMapSummary(
        @JsonProperty("totalChangedContextMaps") int totalChangedContextMaps,
        @JsonProperty("totalContextMapsOutputs") int totalContextMapsOutputs
) {
}
