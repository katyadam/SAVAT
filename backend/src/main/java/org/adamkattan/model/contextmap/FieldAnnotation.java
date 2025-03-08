package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public record FieldAnnotation(
        @JsonProperty("annotation") String annotation
) implements Serializable {
}
