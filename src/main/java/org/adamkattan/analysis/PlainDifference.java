package org.adamkattan.analysis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.output.AnalysisOutput;

import java.util.Optional;

@ApplicationScoped
public class PlainDifference {

    ObjectMapper objectMapper = new ObjectMapper();

    public Optional<AnalysisOutput> getPlainDifference(AnalysisInput newInput, AnalysisInput oldInput) {
        if (!newInput.appName.equals(oldInput.appName)) {
            return Optional.empty();
        }

        boolean areSame = compare(newInput.entities, oldInput.entities) &&
                compare(newInput.graph, oldInput.graph) &&
                compare(newInput.methods, oldInput.methods);
        var result = new AnalysisOutput();
        result.appName = newInput.appName;
        result.newVersion = newInput.version;
        result.oldVersion = oldInput.version;
        result.newCommitHash = newInput.commitHash;
        result.oldCommitHash = oldInput.commitHash;
        result.isDifferent = !areSame;
        return Optional.of(result);
    }

    private <T> boolean compare(T newEntities, T oldEntities) {
        try {
            String newJson = objectMapper.writeValueAsString(newEntities);
            String oldJson = objectMapper.writeValueAsString(oldEntities);
            return newJson.equals(oldJson);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
