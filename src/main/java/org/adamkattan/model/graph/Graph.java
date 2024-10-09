package org.adamkattan.model.graph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class Graph implements Serializable {

    @JsonProperty("nodes")
    private List<GraphNode> nodes;

    @JsonProperty("links")
    private List<GraphLink> links;

}
