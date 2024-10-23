package org.adamkattan.config;

import com.github.difflib.text.DiffRowGenerator;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;

@ApplicationScoped
public class DiffConfig {

    @Produces
    @ApplicationScoped
    public DiffRowGenerator diffRowGenerator() {
        return DiffRowGenerator.create()
                .showInlineDiffs(true)
                .inlineDiffByWord(true)
                .oldTag(f -> "~")
                .newTag(f -> "**")
                .build();
    }

}
