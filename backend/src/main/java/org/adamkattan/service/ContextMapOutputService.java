package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityNotFoundException;
import org.adamkattan.model.contextmap.output.ContextMapOutput;

import java.util.List;

@ApplicationScoped
public class ContextMapOutputService {

    public List<ContextMapOutput> getAllProjectOutputs(Long projectId) {
        return ContextMapOutput
                .find("project.id", projectId).list();
    }

    public ContextMapOutput getContextMapOutputById(Long id) {
        return ContextMapOutput.find("id", id).firstResult();
    }

    public List<ContextMapOutput> getContextMapOutputsWithInputId(Long contextMapInputId, Long projectId) {
        return getAllProjectOutputs(projectId).stream()
                .filter(o -> o.sourceContextMap.id().equals(contextMapInputId)
                        || o.targetContextMap.id().equals(contextMapInputId))
                .toList();
    }


    public Long deleteCallGraphOutputById(Long id) {
        ContextMapOutput output = ContextMapOutput.find("id", id).firstResult();
        if (output != null) {
            output.project.contextMapOutputs.remove(output);
            output.persist();
            output.delete();
            return output.id;
        }
        throw new EntityNotFoundException("Context map output with id " + id + " not found");
    }

}
