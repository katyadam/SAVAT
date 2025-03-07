package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record LinksInputDto(
        @JsonProperty("links") List<Link> links
) {
}
