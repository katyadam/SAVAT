package org.adamkattan.model.graph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class GraphNode implements Serializable {

    @JsonProperty("nodeName")
    private String nodeName;

    @JsonProperty("nodeType")
    private String nodeType;

}
