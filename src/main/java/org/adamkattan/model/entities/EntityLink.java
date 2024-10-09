package org.adamkattan.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class EntityLink implements Serializable {

    @JsonProperty("source")
    private String source;

    @JsonProperty("target")
    private String target;

    @JsonProperty("msSource")
    private String msSource;

    @JsonProperty("msTarget")
    private String msTarget;

    @JsonProperty("sourceMultiplicity")
    private String sourceMultiplicity;

    @JsonProperty("targetMultiplicity")
    private Integer targetMultiplicity;

}
