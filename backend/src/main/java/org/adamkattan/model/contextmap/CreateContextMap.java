package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateContextMap(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("contextMap") ContextMap contextMap
) {
}
