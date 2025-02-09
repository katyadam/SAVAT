package org.adamkattan.analysis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.difflib.text.DiffRow;
import com.github.difflib.text.DiffRowGenerator;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.model.input.AnalysisInputFullDto;
import org.adamkattan.model.output.PlainDifferenceOutput;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class DifferenceAnalysis {

    private final DiffRowGenerator diffRowGenerator;
    ObjectMapper objectMapper = new ObjectMapper();

    @Inject
    public DifferenceAnalysis(DiffRowGenerator diffRowGenerator) {
        this.diffRowGenerator = diffRowGenerator;
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

    public <T> List<DiffRow> getDifferenceRows(T newInput, T oldInput) {
        try {
            String newJson = objectMapper.writeValueAsString(newInput);
            String oldJson = objectMapper.writeValueAsString(oldInput);
            List<String> newInputLines = List.of(newJson.split(System.lineSeparator()));
            List<String> oldInputLines = List.of(oldJson.split(System.lineSeparator()));
            return diffRowGenerator.generateDiffRows(newInputLines, oldInputLines);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
