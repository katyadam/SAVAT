package org.adamkattan.model.methods;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record MicroserviceNode(
        @JsonProperty("name") String name,
        @JsonProperty("methods") List<MicroserviceMethodNode> methods
) implements Serializable {
}
