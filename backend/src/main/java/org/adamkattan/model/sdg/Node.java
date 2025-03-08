package org.adamkattan.model.sdg;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public record Node(
        @JsonProperty("nodeName") String nodeName,
        @JsonProperty("nodeType") String nodeType
) implements Serializable {
}
