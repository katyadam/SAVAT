package org.adamkattan.service;

import com.github.difflib.text.DiffRow;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.DifferenceAnalysis;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.methods.MicroserviceMethodNode;
import org.adamkattan.model.methods.MicroserviceNode;
import org.adamkattan.model.output.AnalysisOutput;
import org.adamkattan.model.output.ChangedMethodsOutput;
import org.adamkattan.model.output.DifferenceOutput;
import org.adamkattan.model.output.DifferenceType;

import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class DifferenceService {

    @Inject
    AnalysisInputService analysisInputService;

    @Inject
    DifferenceAnalysis differenceAnalysis;


    public Optional<AnalysisOutput> isDifferent(AnalysisInput input) {
        var latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(input.project.id);
        Optional<AnalysisOutput> result = differenceAnalysis.isDifferent(input, latestInput);

        if (result.isPresent()) {
            var resultToPersist = result.get();

            if (!resultToPersist.isPersistent())
                resultToPersist.persist();
        }

        return result;
    }

    public DifferenceOutput getJsonDifference(AnalysisInput input, DifferenceType type) {
        var latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(input.project.id);
        return computeDifference(input, latestInput, type);
    }

    public DifferenceOutput getJsonDifference(AnalysisInput input, AnalysisInput chosenInput, DifferenceType type) {
        return computeDifference(input, chosenInput, type);
    }

    public ChangedMethodsOutput getChangedMethods(AnalysisInput input) {
        var latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(input.project.id);
        return computeChangedMethods(input.methods, latestInput.methods);
    }

    private ChangedMethodsOutput computeChangedMethods(List<MicroserviceNode> src, List<MicroserviceNode> dest) {
        Map<String, MicroserviceNode> destMap = dest.stream()
                .collect(Collectors.toMap(MicroserviceNode::name, node -> node));

        List<MicroserviceNode> changedMs = new ArrayList<>();

        for (MicroserviceNode srcMs : src) {
            MicroserviceNode destMs = destMap.get(srcMs.name());

            if (destMs != null) {
                Map<String, String> destMethods = destMs.methods().stream()
                        .collect(Collectors.toMap(MicroserviceMethodNode::name, MicroserviceMethodNode::bytecodeHash));
                List<MicroserviceMethodNode> changedMethods = new ArrayList<>();
                for (MicroserviceMethodNode srcMethod : srcMs.methods()) {
                    String destBytecodeHash = destMethods.get(srcMethod.name());
                    if (destBytecodeHash != null && !destBytecodeHash.equals(srcMethod.bytecodeHash())) {
                        changedMethods.add(srcMethod);
                    }
                }
                if (!changedMethods.isEmpty()) {
                    changedMs.add(new MicroserviceNode(srcMs.name(), changedMethods));
                }
            }
        }

        return new ChangedMethodsOutput(changedMs);
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
                src.project.projectName,
                src.version,
                dest.version,
                newJson.toString(),
                oldJson.toString(),
                type
        );
    }
}
