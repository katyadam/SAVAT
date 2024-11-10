package org.adamkattan.service;

import com.github.difflib.text.DiffRow;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.DifferenceAnalysis;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputFullDto;
import org.adamkattan.model.methods.MethodsInputDto;
import org.adamkattan.model.methods.MicroserviceMethodNode;
import org.adamkattan.model.methods.MicroserviceNode;
import org.adamkattan.model.output.ChangedMethodsOutput;
import org.adamkattan.model.output.DifferenceOutput;
import org.adamkattan.model.output.DifferenceType;
import org.adamkattan.model.output.PlainDifferenceOutput;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
public class DifferenceService {

    @Inject
    AnalysisInputService analysisInputService;

    @Inject
    DifferenceAnalysis differenceAnalysis;


    public Optional<PlainDifferenceOutput> isDifferent(AnalysisInputFullDto input) {
        var latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(input.projectId());
        return differenceAnalysis.isDifferent(input, AnalysisInput.toFullDto(latestInput));
    }

    public DifferenceOutput getJsonDifference(AnalysisInputFullDto input, DifferenceType type) {
        var latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(input.projectId());
        return computeDifference(input, AnalysisInput.toFullDto(latestInput), type);
    }

    public DifferenceOutput getJsonDifference(AnalysisInputFullDto input, AnalysisInputFullDto chosenInput, DifferenceType type) {
        return computeDifference(input, chosenInput, type);
    }

    public ChangedMethodsOutput getChangedMethodsLatest(Long projectId, MethodsInputDto input) {
        var latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(projectId);
        return computeChangedMethods(input.microservices(), latestInput.methods);
    }

    public Optional<ChangedMethodsOutput> getChangedMethods(Long srcId, MethodsInputDto dest) {
        List<MicroserviceNode> srcMethods = analysisInputService.getAnalysisInputMethods(srcId);
        return Optional.of(computeChangedMethods(srcMethods, dest.microservices()));
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

    private DifferenceOutput computeDifference(AnalysisInputFullDto src, AnalysisInputFullDto dest, DifferenceType type) {
        var diffRows = switch (type) {
            case DifferenceType.ENTITIES -> differenceAnalysis.getDifferenceRows(src.entities(), dest.entities());
            case DifferenceType.GRAPH -> differenceAnalysis.getDifferenceRows(src.graph(), dest.graph());
            case DifferenceType.METHODS -> differenceAnalysis.getDifferenceRows(src.methods(), dest.methods());
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
