package org.adamkattan.model.entities;

public record ChangedEntityLink(
        String source,
        String target,
        String msSource,
        String msTarget,
        String sourceMultiplicity,
        Integer targetMultiplicity,
        ChangedEntityLinkType type
) {
    public ChangedEntityLink(EntityLink link, ChangedEntityLinkType type) {
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
