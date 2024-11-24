package org.adamkattan.model.output;

import org.adamkattan.model.entities.ChangedEntityLink;

import java.util.List;

public record ChangedEntitiesLinksOutput(
        List<ChangedEntityLink> changedLinks
) {
}
