package org.adamkattan.model.graph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record Graph(
        @JsonProperty("nodes") List<GraphNode> nodes,
        @JsonProperty("links") List<GraphLink> links
) implements Serializable {
}
