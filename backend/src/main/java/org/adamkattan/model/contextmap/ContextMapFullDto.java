package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.contextmap.linkdiff.ChangedContextMap;
import org.adamkattan.model.contextmap.linkdiff.ChangedContextMapDto;

import java.util.List;

public record ContextMapFullDto(
        @JsonProperty("id") Long id,
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("version") String version,
        @JsonProperty("commitHash") String commitHash,
        @JsonProperty("contextMap") ContextMap contextMap,
        @JsonProperty("changedContextMaps") List<ChangedContextMapDto> changedContextMaps
) {
}
