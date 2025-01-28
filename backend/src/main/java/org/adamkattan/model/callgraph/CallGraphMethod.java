package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record CallGraphMethod(
        @JsonProperty("id") Long id,
        @JsonProperty("name") String name,
        @JsonProperty("type") String classPath,
        @JsonProperty("parameters") List<String> parameters,
        @JsonProperty("returnType") String returnType,
        @JsonProperty("display") String display,
        @JsonProperty("flags") String flags,
        @JsonProperty("bytecodeHash") String bytecodeHash,
        @JsonProperty("microservice") String msName,
        @JsonProperty("endpointURI") String endpointURI,
        @JsonProperty("httpMethod") String httpMethod,
        @JsonProperty("endpointMethod") boolean isInterserviceMethod,
        @JsonProperty("entryPoint") boolean isEntryPoint,
        @JsonProperty("methodSignature") String methodSignature
) {
}
