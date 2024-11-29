package org.adamkattan.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record EntitiesLinksInputDto(
        @JsonProperty("links") List<EntityLink> links
) {
}
