package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CallGraphMethod that = (CallGraphMethod) o;
        return Objects.equals(bytecodeHash, that.bytecodeHash) && Objects.equals(methodSignature, that.methodSignature);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bytecodeHash, methodSignature);
    }
}
