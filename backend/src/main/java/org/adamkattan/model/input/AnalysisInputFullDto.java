package org.adamkattan.model.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.entities.Entities;
import org.adamkattan.model.graph.Graph;

public record AnalysisInputFullDto(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("entities") Entities entities,
        @JsonProperty("graph") Graph graph
) {
}
