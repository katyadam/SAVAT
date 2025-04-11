package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.contextmap.ContextMapFullDto;
import org.adamkattan.model.contextmap.ContextMapSummary;
import org.adamkattan.model.contextmap.CreateContextMap;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ContextMapService {

    @Inject
    ProjectService projectService;

    @Inject
    ContextMapOutputService outputService;

    public ContextMapEntity getContextMapById(Long id) {
        return ContextMapEntity.find("id", id).firstResult();
    }

    public List<ContextMapEntity> getProjectContextMaps(Long projectId) {
        return ContextMapEntity.find("project.id", projectId).list();
    }

    public ContextMapSummary getContextMapSummary(Long id) {
        ContextMapEntity contextMap = ContextMapEntity.find("id", id).firstResult();
        if (contextMap != null) {
            return new ContextMapSummary(
                    contextMap.changedContextMaps.size(),
                    outputService.getContextMapOutputsWithInputId(id, contextMap.project.id).size());
        }
        throw new EntityNotFoundException("ContextMap not found");
    }

    public ContextMapFullDto addContextMapToProject(CreateContextMap contextMapFullDto) {
        var project = projectService.getProjectById(contextMapFullDto.projectId());
        var contextMapEntity = new ContextMapEntity();
        contextMapEntity.project = project;
        contextMapEntity.version = contextMapFullDto.version();
        contextMapEntity.commitHash = contextMapFullDto.commitHash();
        contextMapEntity.contextMap = contextMapFullDto.contextMap();
        contextMapEntity.changedContextMaps = new ArrayList<>();
        contextMapEntity.persist();
        return ContextMapEntity.toFullDto(contextMapEntity);

    }

    public Long deleteContextMapById(Long id) {
        ContextMapEntity contextMapEntity = ContextMapEntity.find("id", id).firstResult();
        if (contextMapEntity != null) {
            outputService.getContextMapOutputsWithInputId(id, contextMapEntity.project.id)
                    .forEach((output) -> outputService.deleteCallGraphOutputById(output.id));
            contextMapEntity.changedContextMaps.clear();
            contextMapEntity.project.contextMaps.remove(contextMapEntity);
            contextMapEntity.persist();
            contextMapEntity.delete();
            return contextMapEntity.id;
        }
        throw new EntityNotFoundException("Input with id: " + id + " was not found");
    }

}
