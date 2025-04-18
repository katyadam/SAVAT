package org.adamkattan.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Set;

public record Microservice(
        @JsonProperty("name") String name,
        @JsonProperty("path") String path,
        @JsonProperty("controllers") Set<JClass> controllers,
        @JsonProperty("services") Set<JClass> services,
        @JsonProperty("repositories") Set<JClass> repositories,
        @JsonProperty("entities") Set<JClass> entities,
        @JsonProperty("feignClientes") Set<JClass> feignClients,
        @JsonProperty("files") Set<ConfigFile> files
) {
}
