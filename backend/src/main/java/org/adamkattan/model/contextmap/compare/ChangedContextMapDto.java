package org.adamkattan.model.contextmap.compare;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.List;

public record ChangedContextMapDto(
        @JsonProperty("id") Long id,
        @JsonProperty("changedLinks") List<ChangedLink> changedLinks,
        @JsonProperty("createdAt") LocalDateTime createdAt
) {
}
