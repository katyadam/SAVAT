package org.adamkattan.model.graph;

import java.util.List;

public record ChangedGraphLink(
        String source,
        String target,
        List<GraphLinkRequest> requests,
        ChangedGraphLinkType type
) {
    public ChangedGraphLink(GraphLink graphLink, ChangedGraphLinkType type) {
        this(
                graphLink.source(),
                graphLink.target(),
                graphLink.requests(),
                type
        );
    }
}
