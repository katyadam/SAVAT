package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.CallGraphDifferenceAnalysis;
import org.adamkattan.model.callgraph.CallGraphInput;
import org.adamkattan.model.callgraph.compare.ChangedCallGraph;
import org.adamkattan.model.callgraph.compare.CallGraphOutput;

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

        CallGraphOutput callGraphOutput = new CallGraphOutput();
        callGraphOutput.changedCallGraph = changedCallGraph;
        callGraphOutput.sourceCallGraphInput = sourceCallGraphInput;
        callGraphOutput.targetCallGraphInput = targetCallGraphInput;
        callGraphOutput.persist();

        return changedCallGraph;
    }

}
