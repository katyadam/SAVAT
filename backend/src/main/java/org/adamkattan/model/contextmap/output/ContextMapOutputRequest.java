package org.adamkattan.model.contextmap.output;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ContextMapOutputRequest(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("sourceContextMapId") Long sourceContextMapId,
        @JsonProperty("targetContextMapId") Long targetContextMapId
) {
}
