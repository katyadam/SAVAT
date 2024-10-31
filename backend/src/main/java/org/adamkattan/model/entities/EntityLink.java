package org.adamkattan.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public record EntityLink(
        @JsonProperty("source") String source,
        @JsonProperty("target") String target,
        @JsonProperty("msSource") String msSource,
        @JsonProperty("msTarget") String msTarget,
        @JsonProperty("sourceMultiplicity") String sourceMultiplicity,
        @JsonProperty("targetMultiplicity") Integer targetMultiplicity
) implements Serializable {
}
