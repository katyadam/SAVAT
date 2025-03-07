package org.adamkattan.service;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.contextmap.ContextMapFullDto;
import org.adamkattan.model.contextmap.ContextMapSummary;

import java.util.List;

@ApplicationScoped
public class ContextMapService {

    @Inject
    ProjectService projectService;

    public ContextMapEntity getContextMapById(Long id) {
        return ContextMapEntity.find("id", id).firstResult();
    }

    public List<ContextMapEntity> getProjectContextMaps(Long projectId) {
        return ContextMapEntity.find("project.id", projectId).list();
    }

    public ContextMapSummary getContextMapSummary(Long id) {
        ContextMapEntity contextMap = ContextMapEntity.find("id", id).firstResult();
        if (contextMap != null) {
            return new ContextMapSummary(contextMap.changedContextMaps.size());
        }
        throw new EntityNotFoundException("ContextMap not found");
    }

    public ContextMapFullDto addContextMapToProject(ContextMapFullDto contextMapFullDto) {
        var project = projectService.getProjectById(contextMapFullDto.projectId());
        var contextMapEntity = new ContextMapEntity();
        contextMapEntity.project = project;
        contextMapEntity.version = contextMapFullDto.version();
        contextMapEntity.commitHash = contextMapFullDto.commitHash();
        contextMapEntity.contextMap = contextMapFullDto.contextMap();
        contextMapEntity.persist();
        return ContextMapEntity.toFullDto(contextMapEntity);

    }

    public Long deleteContextMapById(Long id) {
        ContextMapEntity contextMapEntity = ContextMapEntity.find("id", id).firstResult();
        if (contextMapEntity != null) {
            contextMapEntity.changedContextMaps.clear();
            contextMapEntity.project.contextMaps.remove(contextMapEntity);
            contextMapEntity.persist();
            contextMapEntity.delete();
            return contextMapEntity.id;
        }
        throw new EntityNotFoundException("Input with id: " + id + " was not found");
    }

}
