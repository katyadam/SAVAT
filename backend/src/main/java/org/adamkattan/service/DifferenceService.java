package org.adamkattan.service;

import com.github.difflib.text.DiffRow;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.DifferenceAnalysis;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputFullDto;
import org.adamkattan.model.output.DifferenceOutput;
import org.adamkattan.model.output.DifferenceType;
import org.adamkattan.model.output.PlainDifferenceOutput;

import java.util.Optional;

@ApplicationScoped
public class DifferenceService {

    @Inject
    AnalysisInputService analysisInputService;

    @Inject
    DifferenceAnalysis differenceAnalysis;

    public DifferenceOutput getJsonDifference(AnalysisInputFullDto input, DifferenceType type) {
        var latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(input.projectId());
        return computeDifference(input, AnalysisInput.toFullDto(latestInput), type);
    }

    public DifferenceOutput getJsonDifference(AnalysisInputFullDto input, AnalysisInputFullDto chosenInput, DifferenceType type) {
        return computeDifference(input, chosenInput, type);
    }


    private DifferenceOutput computeDifference(AnalysisInputFullDto src, AnalysisInputFullDto dest, DifferenceType type) {
        var diffRows = switch (type) {
            case DifferenceType.ENTITIES -> differenceAnalysis.getDifferenceRows(src.entities(), dest.entities());
            case DifferenceType.GRAPH -> differenceAnalysis.getDifferenceRows(src.graph(), dest.graph());
        };
        StringBuilder oldJson = new StringBuilder();
        StringBuilder newJson = new StringBuilder();
        for (DiffRow diffRow : diffRows) {
            oldJson.append(diffRow.getOldLine()).append(System.lineSeparator());
            newJson.append(diffRow.getNewLine()).append(System.lineSeparator());
        }
        return new DifferenceOutput(
                src.projectId(),
                src.version(),
                dest.version(),
                newJson.toString(),
                oldJson.toString(),
                type
        );
    }
}
