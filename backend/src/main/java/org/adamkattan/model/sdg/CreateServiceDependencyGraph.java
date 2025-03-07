package org.adamkattan.model.sdg;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateServiceDependencyGraph(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("sdg") ServiceDependencyGraph sdg
) {
}
