package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.adamkattan.model.callgraph.compare.CallGraphOutput;

import java.util.List;

@ApplicationScoped
public class CallGraphOutputService {

    public List<CallGraphOutput> getAllProjectOutputs(Long projectId) {
        return CallGraphOutput
                .find("sourceCallGraphInput.project.id", projectId).list();
    }

    public CallGraphOutput getCallGraphOutputById(Long id) {
        return CallGraphOutput.find("id", id).firstResult();
    }

    public Long deleteCallGraphOutputById(Long id) {
        return CallGraphOutput.delete("id", id);
    }

}
