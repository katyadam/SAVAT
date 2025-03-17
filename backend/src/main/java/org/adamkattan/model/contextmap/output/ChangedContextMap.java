package org.adamkattan.model.contextmap.output;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.contextmap.compare.ChangedLink;

import java.util.List;

public record ChangedContextMap(
        @JsonProperty("nodes") List<ChangedNode> nodes,
        @JsonProperty("links") List<ChangedLink> links
) {
}
