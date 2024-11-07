package org.adamkattan.model.output;

public record DifferenceOutput(
        String projectName,
        String newVersion,
        String oldVersion,
        String newJson,
        String oldJson,
        DifferenceType differenceType
) {
}
