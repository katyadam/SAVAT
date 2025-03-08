package org.adamkattan.model.sdg;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.sdg.compare.ChangedServiceDependecyGraph;

import java.util.List;

public record ServiceDependencyGraphFullDto(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("sdg") ServiceDependencyGraph sdg,
        @JsonProperty("changedSdgs") List<ChangedServiceDependecyGraph> changedSdgs
) {
}
