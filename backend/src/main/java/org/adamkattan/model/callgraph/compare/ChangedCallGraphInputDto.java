package org.adamkattan.model.callgraph.compare;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ChangedCallGraphInputDto(
        @JsonProperty("sourceCallGraphInputId") Long sourceCallGraphInputId,
        @JsonProperty("targetCallGraphInputId") Long targetCallGraphInputId
) {
}
