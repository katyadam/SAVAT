package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.CallGraphChangeImpactAnalysis;
import org.adamkattan.model.callgraph.CallGraphInput;
import org.adamkattan.model.callgraph.compare.CallGraphOutput;
import org.adamkattan.model.callgraph.compare.ChangedCallGraph;
import org.adamkattan.model.project.Project;

@ApplicationScoped
public class CallGraphChangeImpactService {

    @Inject
    CallGraphInputService callGraphInputService;

    @Inject
    ProjectService projectService;

    public CallGraphOutput saveChangedCallGraph(Long projectId, Long sourceCallGraphId, Long targetCallGraphId) {
        Project projectById = projectService.getProjectById(projectId);
        CallGraphInput sourceCallGraphInput = callGraphInputService.getCallGraphInputById(sourceCallGraphId);
        CallGraphInput targetCallGraphInput = callGraphInputService.getCallGraphInputById(targetCallGraphId);
        ChangedCallGraph changedCallGraph = CallGraphChangeImpactAnalysis.changeImpactAnalysis(
                sourceCallGraphInput.callGraph,
                targetCallGraphInput.callGraph
        );

        CallGraphOutput callGraphOutput = new CallGraphOutput();
        callGraphOutput.changedCallGraph = changedCallGraph;
        callGraphOutput.sourceCallGraphInput = CallGraphInput.toSimpleDto(sourceCallGraphInput);
        callGraphOutput.targetCallGraphInput = CallGraphInput.toSimpleDto(targetCallGraphInput);
        callGraphOutput.project = projectById;
        callGraphOutput.persist();

        return callGraphOutput;
    }

}
