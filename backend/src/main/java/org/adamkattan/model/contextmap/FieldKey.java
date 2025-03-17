package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

public record FieldKey(
        @JsonProperty("fieldType") String fieldType,
        @JsonProperty("fieldName") String fieldName
) {
}
