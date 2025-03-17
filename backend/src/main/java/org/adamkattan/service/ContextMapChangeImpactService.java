package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.ContextMapChangeImpactAnalysis;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.contextmap.output.CIAContextMap;
import org.adamkattan.model.contextmap.output.ContextMapOutput;
import org.adamkattan.model.project.Project;

@ApplicationScoped
public class ContextMapChangeImpactService {

    @Inject
    ContextMapService contextMapService;

    @Inject
    ProjectService projectService;

    public CIAContextMap saveChangedContextMap(Long projectId, Long sourceContextMapId, Long targetContextMapId) {
        Project projectById = projectService.getProjectById(projectId);
        ContextMapEntity sourceContextMapEntity = contextMapService.getContextMapById(sourceContextMapId);
        ContextMapEntity targetContextMapEntity = contextMapService.getContextMapById(targetContextMapId);
        CIAContextMap CIAContextMap =
                ContextMapChangeImpactAnalysis.changeImpactAnalysis(sourceContextMapEntity.contextMap, targetContextMapEntity.contextMap);
        ContextMapOutput contextMapOutput = new ContextMapOutput();
        contextMapOutput.changedContextMap = CIAContextMap;
        contextMapOutput.sourceContextMap = ContextMapEntity.toDto(sourceContextMapEntity);
        contextMapOutput.targetContextMap = ContextMapEntity.toDto(targetContextMapEntity);
        contextMapOutput.project = projectById;
        contextMapOutput.persist();

        return CIAContextMap;
    }
}
