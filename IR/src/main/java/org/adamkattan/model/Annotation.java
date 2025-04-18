package org.adamkattan.model;

public record Annotation(
        String contents,
        String name,
        String packageAndClassName
) {
}
