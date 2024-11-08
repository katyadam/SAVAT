package org.adamkattan.model.output;

public record DifferenceOutput(
        Long projectId,
        String newVersion,
        String oldVersion,
        String newJson,
        String oldJson,
        DifferenceType differenceType
) {
}
