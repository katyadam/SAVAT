package org.adamkattan.model.contextmap.output;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.contextmap.Link;

import java.util.List;

public record CIAContextMap(
        @JsonProperty("nodes") List<ChangedNode> nodes,
        @JsonProperty("links") List<Link> links
) {
}
