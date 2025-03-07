package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record Node(
        @JsonProperty("msName") String msName,
        @JsonProperty("nodeName") String nodeName,
        @JsonProperty("nodeFullName") String nodeFullName,
        @JsonProperty("fields") List<Field> fields
) implements Serializable {
}
