package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.contextmap.ContextMapFullDto;
import org.adamkattan.model.contextmap.compare.ChangedContextMap;

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

    public ContextMapEntity getProjectLatestContextMapByVersion(Long projectId) {
        return ContextMapEntity
                .find("project.id = ?1 ORDER BY string_to_array(version, '.') DESC", projectId)
                .firstResult();
    }

    public ContextMapEntity getProjectLatestContextMapByTimestamp(Long projectId) {
        return ContextMapEntity
                .find("project.id = ?1 ORDER BY createdAt DESC", projectId)
                .firstResult();
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

    public List<ChangedContextMap> getContextMapsChanges(Long id) {
        ContextMapEntity contextMap = ContextMapEntity.find("id", id).firstResult();
        return contextMap.changedContextMaps;
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
