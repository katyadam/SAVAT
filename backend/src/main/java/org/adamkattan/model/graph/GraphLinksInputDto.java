package org.adamkattan.model.graph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record GraphLinksInputDto(
        @JsonProperty("links") List<GraphLink> links
) {
}
