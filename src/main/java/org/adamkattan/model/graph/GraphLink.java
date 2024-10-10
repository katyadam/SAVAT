package org.adamkattan.model.graph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record GraphLink(
        @JsonProperty("source") String source,
        @JsonProperty("target") String target,
        @JsonProperty("requests") List<GraphLinkRequest> requests
) implements Serializable {
}
