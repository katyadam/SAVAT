package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.contextmap.compare.ChangedContextMap;

import java.util.List;

public record ContextMapFullDto(
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("contextMap") ContextMap contextMap,
        @JsonProperty("changedContextMaps") List<ChangedContextMap> changedContextMaps
) {
}
