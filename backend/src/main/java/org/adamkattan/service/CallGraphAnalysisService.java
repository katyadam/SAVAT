package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.adamkattan.model.callgraph.compare.ChangedCallGraphInput;

import java.util.List;

@ApplicationScoped
public class CallGraphAnalysisService {

    public List<ChangedCallGraphInput> getAllProjectOutputs(Long projectId) {
        return ChangedCallGraphInput
                .find("sourceCallGraphInput.project.id", projectId).list();
    }

    public ChangedCallGraphInput getChangedCallGraphInputById(Long id) {
        return ChangedCallGraphInput.find("id", id).firstResult();
    }

}
