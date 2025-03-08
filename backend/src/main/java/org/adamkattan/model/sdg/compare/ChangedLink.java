package org.adamkattan.model.sdg.compare;

import org.adamkattan.model.sdg.Link;
import org.adamkattan.model.sdg.LinkRequest;

import java.util.List;

public record ChangedLink(
        String source,
        String target,
        List<LinkRequest> requests,
        ChangedLinkType type
) {
    public ChangedLink(Link link, ChangedLinkType type) {
        this(
                link.source(),
                link.target(),
                link.requests(),
                type
        );
    }
}
