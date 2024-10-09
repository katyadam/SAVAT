package org.adamkattan.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class EntityNode implements Serializable {

    @JsonProperty("msName")
    private String msName;

    @JsonProperty("nodeName")
    private String nodeName;

    @JsonProperty("nodeFullName")
    private String nodeFullName;

    @JsonProperty("fields")
    private List<EntityField> fields;

}
