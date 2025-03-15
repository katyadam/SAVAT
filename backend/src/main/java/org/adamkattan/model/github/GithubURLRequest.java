package org.adamkattan.model.github;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GithubURLRequest(
        @JsonProperty("methodName") String methodName,
        @JsonProperty("ms") String ms,
        @JsonProperty("classPath") String classPath,
        @JsonProperty("branch") String branch,
        @JsonProperty("owner") String owner,
        @JsonProperty("repository") String repository
) {
}
