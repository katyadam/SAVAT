package org.adamkattan.model.entities;

public record ChangedEntityLink(
        EntityLink link,
        ChangedEntityLinkType type
) {
}
