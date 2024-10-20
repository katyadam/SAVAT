package org.adamkattan.model.methods;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public record MicroserviceMethodNode(
        @JsonProperty String name,
        @JsonProperty String bytecodeHash
) implements Serializable {
}
