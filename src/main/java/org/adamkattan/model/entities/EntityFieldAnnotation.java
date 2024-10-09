package org.adamkattan.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class EntityFieldAnnotation implements Serializable {

    @JsonProperty("annotation")
    private String annotation;

}
