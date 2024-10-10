package org.adamkattan.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record EntityNode(
        @JsonProperty("msName") String msName,
        @JsonProperty("nodeName") String nodeName,
        @JsonProperty("nodeFullName") String nodeFullName,
        @JsonProperty("fields") List<EntityField> fields
) implements Serializable {
}
