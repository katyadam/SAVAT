package org.adamkattan.model.methods;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record MethodsInputDto(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("methods") List<MicroserviceNode> methods
) {
}
