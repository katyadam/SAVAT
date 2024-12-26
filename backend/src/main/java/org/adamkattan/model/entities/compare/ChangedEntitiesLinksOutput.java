package org.adamkattan.model.entities.compare;

import java.util.List;

public record ChangedEntitiesLinksOutput(
        List<ChangedEntityLink> changedLinks
) {
}
