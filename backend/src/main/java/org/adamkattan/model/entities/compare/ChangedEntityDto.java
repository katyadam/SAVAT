package org.adamkattan.model.entities.compare;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.List;

public record ChangedEntityDto(
        @JsonProperty("id") Long id,
        @JsonProperty("changedLinks") List<ChangedEntityLink> changedLinks,
        @JsonProperty("createdAt") LocalDateTime createdAt
) {
}
