package org.adamkattan.model.graph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public record GraphNode(
        @JsonProperty("nodeName") String nodeName,
        @JsonProperty("nodeType") String nodeType
) implements Serializable {
}
