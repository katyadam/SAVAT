package org.adamkattan.model.project;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ProjectDto(
        @JsonProperty("id") Long id,
        @JsonProperty("projectName") String projectName
) {
}
