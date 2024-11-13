package org.adamkattan.model.output;

import org.adamkattan.model.methods.MicroserviceNode;

import java.util.List;

public record ChangedMethodsOutput(
        List<MicroserviceNode> changedMs
) {
}
