package org.adamkattan.model.graph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class GraphLink implements Serializable {

    @JsonProperty("source")
    private String source;

    @JsonProperty("target")
    private String target;

    @JsonProperty("requests")
    private List<GraphLinkRequest> requests;

}
