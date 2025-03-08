package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record Field(
        @JsonProperty("fieldName") String fieldName,
        @JsonProperty("fieldFullName") String fieldFullName,
        @JsonProperty("fieldType") String fieldType,
        @JsonProperty("fieldAnnotations") List<FieldAnnotation> fieldAnnotations,
        @JsonProperty("fieldIsReference") Boolean fieldIsReference,
        @JsonProperty("fieldEntityRefName") String fieldEntityRefName,
        @JsonProperty("isCollection") Boolean isCollection
) implements Serializable {
}
