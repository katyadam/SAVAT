package org.adamkattan.service;

import com.github.difflib.text.DiffRow;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.DifferenceAnalysis;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.output.AnalysisOutput;
import org.adamkattan.model.output.DifferenceOutput;
import org.adamkattan.model.output.DifferenceType;

import java.util.Optional;

@ApplicationScoped
public class DifferenceService {

    @Inject
    AnalysisInputService analysisInputService;

    @Inject
    DifferenceAnalysis differenceAnalysis;


    public Optional<AnalysisOutput> isDifferent(AnalysisInput input) {
        var latestInput = analysisInputService.getAppLatestAnalysisInputByTimestamp(input.appName);
        Optional<AnalysisOutput> result = differenceAnalysis.isDifferent(input, latestInput);

        if (result.isPresent()) {
            var resultToPersist = result.get();

            if (!resultToPersist.isPersistent())
                resultToPersist.persist();
        }

        return result;
    }

    public DifferenceOutput getDifference(AnalysisInput input, DifferenceType type) {
        var latestInput = analysisInputService.getAppLatestAnalysisInputByTimestamp(input.appName);
        return computeDifference(input, latestInput, type);
    }

    public DifferenceOutput getDifference(AnalysisInput input, AnalysisInput chosenInput, DifferenceType type) {
        return computeDifference(input, chosenInput, type);
    }

    private DifferenceOutput computeDifference(AnalysisInput src, AnalysisInput dest, DifferenceType type) {
        var diffRows = switch (type) {
            case DifferenceType.ENTITIES -> differenceAnalysis.getDifferenceRows(src.entities, dest.entities);
            case DifferenceType.GRAPH -> differenceAnalysis.getDifferenceRows(src.graph, dest.graph);
            case DifferenceType.METHODS -> differenceAnalysis.getDifferenceRows(src.methods, dest.methods);
        };
        StringBuilder oldJson = new StringBuilder();
        StringBuilder newJson = new StringBuilder();
        for (DiffRow diffRow : diffRows) {
            oldJson.append(diffRow.getOldLine()).append(System.lineSeparator());
            newJson.append(diffRow.getNewLine()).append(System.lineSeparator());
        }
        return new DifferenceOutput(
                src.appName,
                src.version,
                dest.version,
                newJson.toString(),
                oldJson.toString(),
                type
        );
    }
}
