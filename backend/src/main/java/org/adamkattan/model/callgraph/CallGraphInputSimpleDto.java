package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public record CallGraphInputSimpleDto(
        @JsonProperty("id") Long id,
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("createdAt") LocalDateTime createdAt
) {
    public CallGraphInputSimpleDto(CallGraphInput input) {
        this(
                input.id,
                input.project.id,
                input.version,
                input.commitHash,
                input.createdAt);
    }
}
