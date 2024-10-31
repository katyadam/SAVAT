package org.adamkattan.model.output;

public record DifferenceOutput(
        String appName,
        String newVersion,
        String oldVersion,
        String newJson,
        String oldJson,
        DifferenceType differenceType
) {
}
