package org.adamkattan.model.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.contextmap.ContextMap;
import org.adamkattan.model.sdg.ServiceDependencyGraph;

public record AnalysisInputFullDto(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("entities") ContextMap contextMap,
        @JsonProperty("graph") ServiceDependencyGraph serviceDependencyGraph
) {
}
