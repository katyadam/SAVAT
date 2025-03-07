package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Objects;

public record Link(
        @JsonProperty("source") String source,
        @JsonProperty("target") String target,
        @JsonProperty("msSource") String msSource,
        @JsonProperty("msTarget") String msTarget,
        @JsonProperty("sourceMultiplicity") String sourceMultiplicity,
        @JsonProperty("targetMultiplicity") Integer targetMultiplicity
) implements Serializable {

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Link that = (Link) o;
        return Objects.equals(source, that.source) &&
                Objects.equals(target, that.target) &&
                Objects.equals(msSource, that.msSource) &&
                Objects.equals(msTarget, that.msTarget) &&
                Objects.equals(sourceMultiplicity, that.sourceMultiplicity) &&
                Objects.equals(targetMultiplicity, that.targetMultiplicity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(source, target, msSource, msTarget, sourceMultiplicity, targetMultiplicity);
    }
}
