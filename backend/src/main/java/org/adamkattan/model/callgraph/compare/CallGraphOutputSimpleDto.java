package org.adamkattan.model.callgraph.compare;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.callgraph.CallGraphInputSimpleDto;

import java.time.LocalDateTime;

public record CallGraphOutputSimpleDto(
        @JsonProperty("sourceInput") CallGraphInputSimpleDto sourceInput,
        @JsonProperty("targetInput") CallGraphInputSimpleDto targetInput,
        @JsonProperty("createdAt") LocalDateTime createdAt
) {
}
