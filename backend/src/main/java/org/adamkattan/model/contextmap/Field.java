package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public record Field(
        @JsonProperty("fieldName") String fieldName,
        @JsonProperty("fieldFullName") String fieldFullName,
        @JsonProperty("fieldType") String fieldType,
        @JsonProperty("fieldAnnotations") List<FieldAnnotation> fieldAnnotations,
        @JsonProperty("fieldIsReference") Boolean fieldIsReference,
        @JsonProperty("fieldEntityRefName") String fieldEntityRefName,
        @JsonProperty("isCollection") Boolean isCollection
) implements Serializable {

    @JsonIgnore
    public boolean compare(Field otherField) {
        if (Objects.equals(fieldName, otherField.fieldName()) &&
                Objects.equals(fieldType, otherField.fieldType())) {
            List<String> otherAnnotations = new ArrayList<>(otherField.fieldAnnotations.stream()
                    .map(FieldAnnotation::annotation)
                    .toList());
            List<String> annotations = new ArrayList<>(fieldAnnotations.stream()
                    .map(FieldAnnotation::annotation)
                    .toList());

            Collections.sort(otherAnnotations);
            Collections.sort(annotations);

            return Objects.equals(fieldFullName, otherField.fieldFullName()) &&
                    Objects.equals(fieldEntityRefName, otherField.fieldEntityRefName()) &&
                    Objects.equals(isCollection, otherField.isCollection()) &&
                    Objects.equals(fieldIsReference, otherField.fieldIsReference()) &&
                    annotations.equals(otherAnnotations);
        }
        return false;
    }

}
