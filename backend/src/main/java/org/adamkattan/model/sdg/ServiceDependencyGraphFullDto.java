package org.adamkattan.model.sdg;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ServiceDependencyGraphFullDto(
        @JsonProperty("id") Long id,
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("sdg") ServiceDependencyGraph sdg
) {
}
