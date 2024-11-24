package org.adamkattan.model.entities;

import lombok.Getter;

@Getter
public class ChangedEntityLink {
    private final String source;
    private final String target;
    private final String msSource;
    private final String msTarget;
    private final String sourceMultiplicity;
    private final Integer targetMultiplicity;
    private final ChangedEntityLinkType type;

    public ChangedEntityLink(EntityLink link, ChangedEntityLinkType type) {
        this.source = link.source();
        this.target = link.target();
        this.msSource = link.msSource();
        this.msTarget = link.msTarget();
        this.sourceMultiplicity = link.sourceMultiplicity();
        this.targetMultiplicity = link.targetMultiplicity();
        this.type = type;
    }
}
