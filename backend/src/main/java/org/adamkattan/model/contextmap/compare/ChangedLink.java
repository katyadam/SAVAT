package org.adamkattan.model.contextmap.compare;

import org.adamkattan.model.contextmap.Link;

public record ChangedLink(
        String source,
        String target,
        String msSource,
        String msTarget,
        String sourceMultiplicity,
        Integer targetMultiplicity,
        ChangedLinkType type
) {
    public ChangedLink(Link link, ChangedLinkType type) {
        this(
                link.source(),
                link.target(),
                link.msSource(),
                link.msTarget(),
                link.sourceMultiplicity(),
                link.targetMultiplicity(),
                type
        );
    }
}
