package org.adamkattan.model.contextmap.linkdiff;

import java.util.List;

public record ChangedLinksOutput(
        List<ChangedLink> changedLinks
) {
}
