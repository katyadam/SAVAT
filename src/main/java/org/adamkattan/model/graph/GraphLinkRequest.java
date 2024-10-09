package org.adamkattan.model.graph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class GraphLinkRequest implements Serializable {

    @JsonProperty("type")
    private String type; // TODO: PUT, GET

    @JsonProperty("uri")
    private String uri;

    @JsonProperty("requestReturn")
    private String requestReturn;

    @JsonProperty("endpointFunction")
    private String endpointFunction;

    @JsonProperty("endpointMsName")
    private String endpointMsName;

    @JsonProperty("targetEndpointUri")
    private String targetEndpointUri;

    @JsonProperty("isCollection")
    private Boolean isCollection;

    @JsonProperty("parentMethod")
    private String parentMethod;

    @JsonProperty("msName")
    private String msName;

    @JsonProperty("restCallInClassName")
    private String restCallInClassName;
}
