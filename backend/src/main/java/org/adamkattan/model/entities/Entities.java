package org.adamkattan.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record Entities(
        @JsonProperty("nodes") List<EntityNode> nodes,
        @JsonProperty("links") List<EntityLink> links
) implements Serializable {
}
