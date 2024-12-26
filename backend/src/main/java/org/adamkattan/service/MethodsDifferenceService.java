package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.model.methods.MethodsInputDto;
import org.adamkattan.model.methods.MicroserviceNode;
import org.adamkattan.model.methods.compare.ChangedMethodsOutput;

import java.util.List;
import java.util.Optional;

import static org.adamkattan.analysis.MethodsDifferenceAnalysis.computeChangedMethods;

@ApplicationScoped
public class MethodsDifferenceService {

    @Inject
    AnalysisInputService analysisInputService;

    public ChangedMethodsOutput getChangedMethodsLatest(Long projectId, MethodsInputDto input) {
        var latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(projectId);
        return computeChangedMethods(input.microservices(), latestInput.methods);
    }

    public Optional<ChangedMethodsOutput> getChangedMethods(Long srcId, MethodsInputDto dest) {
        List<MicroserviceNode> srcMethods = analysisInputService.getAnalysisInputMethods(srcId);
        return Optional.of(computeChangedMethods(srcMethods, dest.microservices()));
    }

}
