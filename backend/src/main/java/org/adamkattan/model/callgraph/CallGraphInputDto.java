package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public record CallGraphInputDto(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("callGraph") CallGraph callGraph,
        @JsonProperty("createdAt") LocalDateTime createdAt
) {
}
