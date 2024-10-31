package org.adamkattan.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public record EntityFieldAnnotation(
        @JsonProperty("annotation") String annotation
) implements Serializable {
}
