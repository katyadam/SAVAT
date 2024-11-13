package org.adamkattan.model.output;

public record PlainDifferenceOutput(
        Long projectId,
        String newVersion,
        String oldVersion,
        String newCommitHash,
        String oldCommitHash,
        Boolean isDifferent
) {
}
