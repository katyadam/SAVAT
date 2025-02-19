package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.model.callgraph.CallGraphInput;
import org.adamkattan.model.callgraph.CallGraphInputDto;

import java.util.List;

@ApplicationScoped
public class CallGraphInputService {

    @Inject
    ProjectService projectService;

    public CallGraphInput getCallGraphInputById(Long id) {
        return CallGraphInput.find("id", id).firstResult();
    }

    public List<CallGraphInput> getProjectCallGraphInputs(Long projectId) {
        return CallGraphInput.find("project.id", projectId).list();
    }

    public CallGraphInputDto addCallGraphInputToProject(CallGraphInputDto callGraphInputDto) {
        var project = projectService.getProjectById(callGraphInputDto.projectId());
        var callGraphInput = new CallGraphInput();
        callGraphInput.project = project;
        callGraphInput.version = callGraphInputDto.version();
        callGraphInput.commitHash = callGraphInputDto.commitHash();
        callGraphInput.callGraph = callGraphInputDto.callGraph();
        callGraphInput.persist();
        return CallGraphInput.toDto(callGraphInput);
    }

    public Long deleteCallGraphInputById(Long id) {
        return CallGraphInput.delete("id", id);
    }

}
