package org.adamkattan.model.contextmap.linkdiff;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CompareContextMapsRequest(
        @JsonProperty("sourceId") Long sourceId,
        @JsonProperty("targetId") Long targetId
) {
}
