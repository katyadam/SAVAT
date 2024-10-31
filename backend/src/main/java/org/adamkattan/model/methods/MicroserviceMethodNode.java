package org.adamkattan.model.methods;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public record MicroserviceMethodNode(
        @JsonProperty("name") String name,
        @JsonProperty("bytecodeHash") String bytecodeHash
) implements Serializable {
}
