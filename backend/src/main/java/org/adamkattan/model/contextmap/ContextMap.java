package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record ContextMap(
        @JsonProperty("nodes") List<Node> nodes,
        @JsonProperty("links") List<Link> links
) implements Serializable {
}
