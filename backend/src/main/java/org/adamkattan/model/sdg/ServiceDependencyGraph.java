package org.adamkattan.model.sdg;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record ServiceDependencyGraph(
        @JsonProperty("nodes") List<Node> nodes,
        @JsonProperty("links") List<Link> links
) implements Serializable {
}
