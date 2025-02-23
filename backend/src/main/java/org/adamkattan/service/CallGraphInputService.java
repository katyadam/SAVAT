package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import org.adamkattan.model.callgraph.CallGraphInput;
import org.adamkattan.model.callgraph.CallGraphInputDto;

import java.util.List;

@ApplicationScoped
public class CallGraphInputService {

    @Inject
    ProjectService projectService;

    @Inject
    CallGraphOutputService callGraphOutputService;

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

    public int getCallGraphInputOutputsCount(Long id) {
        CallGraphInput callGraphInput = getCallGraphInputById(id);
        return callGraphOutputService.getCallGraphOutputsWithInputId(id, callGraphInput.project.id).size();
    }

    public Long deleteCallGraphInputById(Long id) {
        CallGraphInput callGraphInput = CallGraphInput.find("id", id).firstResult();
        if (callGraphInput != null) {
            callGraphOutputService.getCallGraphOutputsWithInputId(id, callGraphInput.project.id)
                    .forEach((output) -> callGraphOutputService.deleteCallGraphOutputById(output.id));
            callGraphInput.project.callGraphInputs.remove(callGraphInput);
            callGraphInput.delete();
            return callGraphInput.id;
        }
        throw new EntityNotFoundException("Input with id: " + id + " was not found");
    }

}
