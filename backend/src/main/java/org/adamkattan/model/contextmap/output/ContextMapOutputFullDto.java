package org.adamkattan.model.contextmap.output;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.contextmap.ContextMapDto;

import java.time.LocalDateTime;

public record ContextMapOutputFullDto(
        @JsonProperty("id") Long id,
        @JsonProperty("projectId") Long projectId,
        @JsonProperty("sourceInput") ContextMapDto sourceInput,
        @JsonProperty("targetInput") ContextMapDto targetInput,
        @JsonProperty("createdAt") LocalDateTime createdAt,
        @JsonProperty("ciaContextMap") CIAContextMap ciaContextMap
) {
}
