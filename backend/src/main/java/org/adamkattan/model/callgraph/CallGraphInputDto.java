package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CallGraphInputDto(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("callGraph") CallGraph callGraph
) {
}
