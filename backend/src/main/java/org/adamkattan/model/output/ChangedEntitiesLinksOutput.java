package org.adamkattan.model.output;

import org.adamkattan.model.entities.EntityLink;

import java.util.List;

public record ChangedEntitiesLinksOutput(
        List<EntityLink> addedLinks,
        List<EntityLink> removedLinks,
        List<EntityLink> modifiedLinks
) {
}
