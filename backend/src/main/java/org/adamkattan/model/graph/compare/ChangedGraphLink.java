package org.adamkattan.model.graph.compare;

import org.adamkattan.model.graph.GraphLink;
import org.adamkattan.model.graph.GraphLinkRequest;

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
