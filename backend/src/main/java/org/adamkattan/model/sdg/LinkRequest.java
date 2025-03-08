package org.adamkattan.model.sdg;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public record LinkRequest(
        @JsonProperty("type") String type,
        @JsonProperty("uri") String uri,
        @JsonProperty("requestReturn") String requestReturn,
        @JsonProperty("endpointFunction") String endpointFunction,
        @JsonProperty("endpointMsName") String endpointMsName,
        @JsonProperty("targetEndpointUri") String targetEndpointUri,
        @JsonProperty("isCollection") Boolean isCollection,
        @JsonProperty("parentMethod") String parentMethod,
        @JsonProperty("msName") String msName,
        @JsonProperty("restCallInClassName") String restCallInClassName
) implements Serializable {
}
