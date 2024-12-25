package org.adamkattan.model.output;

import org.adamkattan.model.graph.ChangedGraphLink;

import java.util.List;

public record ChangedGraphLinksOutput(
        List<ChangedGraphLink> changedLinks
) {
}
