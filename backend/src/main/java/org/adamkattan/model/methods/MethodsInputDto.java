package org.adamkattan.model.methods;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record MethodsInputDto(
        @JsonProperty("microservices") List<MicroserviceNode> microservices
) {
}
