package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.CallGraphDifferenceAnalysis;
import org.adamkattan.model.callgraph.CallGraphInput;
import org.adamkattan.model.callgraph.compare.ChangedCallGraph;
import org.adamkattan.model.callgraph.compare.ChangedCallGraphInput;

@ApplicationScoped
public class CallGraphDifferenceService {

    @Inject
    CallGraphInputService callGraphInputService;

    public ChangedCallGraph saveChangedCallGraph(Long sourceCallGraphId, Long targetCallGraphId) {
        CallGraphInput sourceCallGraphInput = callGraphInputService.getCallGraphInputById(sourceCallGraphId);
        CallGraphInput targetCallGraphInput = callGraphInputService.getCallGraphInputById(targetCallGraphId);
        ChangedCallGraph changedCallGraph = CallGraphDifferenceAnalysis.changeImpactAnalysis(
                sourceCallGraphInput.callGraph,
                targetCallGraphInput.callGraph
        );

        ChangedCallGraphInput changedCallGraphInput = new ChangedCallGraphInput();
        changedCallGraphInput.changedCallGraph = changedCallGraph;
        changedCallGraphInput.sourceCallGraphInput = sourceCallGraphInput;
        changedCallGraphInput.targetCallGraphInput = targetCallGraphInput;
        changedCallGraphInput.persist();

        return changedCallGraph;
    }

}
