package org.adamkattan.model.sdg.compare;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CompareSDGsRequest(
        @JsonProperty("sourceId") Long sourceId,
        @JsonProperty("targetId") Long targetId
) {
}
