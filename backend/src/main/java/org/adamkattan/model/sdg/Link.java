package org.adamkattan.model.sdg;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public record Link(
        @JsonProperty("source") String source,
        @JsonProperty("target") String target,
        @JsonProperty("requests") List<LinkRequest> requests
) implements Serializable {
}
