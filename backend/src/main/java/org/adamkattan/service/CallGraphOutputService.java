package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityNotFoundException;
import org.adamkattan.model.callgraph.compare.CallGraphOutput;

import java.util.List;

@ApplicationScoped
public class CallGraphOutputService {

    public List<CallGraphOutput> getAllProjectOutputs(Long projectId) {
        return CallGraphOutput
                .find("project.id", projectId).list();
    }

    public CallGraphOutput getCallGraphOutputById(Long id) {
        return CallGraphOutput.find("id", id).firstResult();
    }

    public List<CallGraphOutput> getCallGraphOutputsWithInputId(Long callGraphInputId, Long projectId) {
        return getAllProjectOutputs(projectId).stream()
                .filter(o -> o.sourceCallGraphInput.id().equals(callGraphInputId)
                        || o.targetCallGraphInput.id().equals(callGraphInputId))
                .toList();
    }


    public Long deleteCallGraphOutputById(Long id) {
        CallGraphOutput output = CallGraphOutput.find("id", id).firstResult();
        if (output != null) {
            output.project.callGraphOutputs.remove(output);
            output.persist();
            output.delete();
            return output.id;
        }
        throw new EntityNotFoundException("Call graph output with id " + id + " not found");
    }

}
