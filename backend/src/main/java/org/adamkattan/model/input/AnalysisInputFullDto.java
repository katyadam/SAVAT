package org.adamkattan.model.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.entities.Entities;
import org.adamkattan.model.graph.Graph;
import org.adamkattan.model.methods.MicroserviceNode;

import java.time.LocalDateTime;
import java.util.List;

public record AnalysisInputDto(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("entities") Entities entities,
        @JsonProperty("graph") Graph graph,
        @JsonProperty("methods") List<MicroserviceNode> methods,
        @JsonProperty("createdAt") LocalDateTime createdAt
) {
}
