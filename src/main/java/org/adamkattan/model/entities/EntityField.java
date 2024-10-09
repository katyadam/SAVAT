package org.adamkattan.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class EntityField implements Serializable {

    @JsonProperty("fieldName")
    private String fieldName;

    @JsonProperty("fieldFullName")
    private String fieldFullName;

    @JsonProperty("fieldType")
    private String fieldType;

    @JsonProperty("fieldAnnotations")
    private List<EntityFieldAnnotation> fieldAnnotations;

    @JsonProperty("fieldIsReference")
    private Boolean fieldIsReference;

    @JsonProperty("fieldEntityRefName")
    private String fieldEntityRefName;

    @JsonProperty("isCollection")
    private Boolean isCollection;

}
