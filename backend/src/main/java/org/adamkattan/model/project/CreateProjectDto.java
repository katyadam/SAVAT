package org.adamkattan.model.project;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateProjectDto(
        @JsonProperty("projectName") String projectName
) {
}
