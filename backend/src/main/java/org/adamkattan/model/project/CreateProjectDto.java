package org.adamkattan.model.project;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Optional;

public record CreateProjectDto(
        @JsonProperty("name") String name,
        @JsonProperty("owner") String owner,
        @JsonProperty("repository") String repository,
        @JsonProperty("accessToken") Optional<String> accessToken
) {
}
