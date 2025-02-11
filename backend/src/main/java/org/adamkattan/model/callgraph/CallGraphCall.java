package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public record CallGraphCall(
        @JsonProperty("source") String source,
        @JsonProperty("target") String target,
        @JsonProperty("isInterserviceCall") boolean isInterserviceCall,
        @JsonProperty("httpMethod") String httpMethod
) {
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CallGraphCall that = (CallGraphCall) o;
        return isInterserviceCall == that.isInterserviceCall &&
                Objects.equals(source, that.source) &&
                Objects.equals(target, that.target) &&
                Objects.equals(httpMethod, that.httpMethod);
    }

    @Override
    public int hashCode() {
        return Objects.hash(source, target, isInterserviceCall, httpMethod);
    }
}
