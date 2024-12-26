package org.adamkattan.model.graph.compare;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.List;

public record ChangedGraphDto(
        @JsonProperty("id") Long id,
        @JsonProperty("changedLinks") List<ChangedGraphLink> changedLinks,
        @JsonProperty("createdAt") LocalDateTime createdAt
) {
}
