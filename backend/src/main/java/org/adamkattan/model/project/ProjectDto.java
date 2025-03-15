package org.adamkattan.model.project;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ProjectDto(
        @JsonProperty("id") Long id,
        @JsonProperty("name") String name,
        @JsonProperty("owner") String owner,
        @JsonProperty("repository") String repository,
        @JsonProperty("accessToken") String accessToken
) {
}
