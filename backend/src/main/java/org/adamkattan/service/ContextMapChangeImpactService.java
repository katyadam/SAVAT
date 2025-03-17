package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.ContextMapCIA;
import org.adamkattan.analysis.ContextMapChangeImpactAnalysis;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.contextmap.LinksInputDto;
import org.adamkattan.model.contextmap.compare.ChangedContextMap;
import org.adamkattan.model.contextmap.compare.ChangedLinksOutput;
import org.adamkattan.model.contextmap.output.CIAContextMap;
import org.adamkattan.model.contextmap.output.ContextMapOutput;
import org.adamkattan.model.project.Project;

import java.util.List;

@ApplicationScoped
public class ContextMapChangeImpactService {

    @Inject
    ContextMapService contextMapService;

    @Inject
    ProjectService projectService;

    public ChangedContextMap getChangedContextMap(Long id) {
        return ChangedContextMap.find("id", id).firstResult();
    }

    public List<ChangedContextMap> getChangedContextMaps(Long contextMapId) {
        return ChangedContextMap.find("contextMap.id", contextMapId).list();
    }

    public ChangedLinksOutput saveChangedLinks(
            LinksInputDto linksInputDto,
            Long srcId
    ) {
        ContextMapEntity contextMapEntity = contextMapService.getContextMapById(srcId);
        ChangedLinksOutput linksDifference = ContextMapChangeImpactAnalysis.getLinksDifference(
                contextMapEntity.contextMap.links(),
                linksInputDto.links()
        );
        var changedContextMap = new ChangedContextMap();
        changedContextMap.changedLinks = linksDifference.changedLinks();
        changedContextMap.contextMap = contextMapEntity;
        changedContextMap.persist();
        return linksDifference;
    }

    public CIAContextMap saveChangedContextMap(Long projectId, Long sourceContextMapId, Long targetContextMapId) {
        Project projectById = projectService.getProjectById(projectId);
        ContextMapEntity sourceContextMapEntity = contextMapService.getContextMapById(sourceContextMapId);
        ContextMapEntity targetContextMapEntity = contextMapService.getContextMapById(targetContextMapId);
        CIAContextMap CIAContextMap =
                ContextMapCIA.changeImpactAnalysis(sourceContextMapEntity.contextMap, targetContextMapEntity.contextMap);
        ContextMapOutput contextMapOutput = new ContextMapOutput();
        contextMapOutput.changedContextMap = CIAContextMap;
        contextMapOutput.sourceContextMap = ContextMapEntity.toDto(sourceContextMapEntity);
        contextMapOutput.targetContextMap = ContextMapEntity.toDto(targetContextMapEntity);
        contextMapOutput.project = projectById;
        contextMapOutput.persist();

        return CIAContextMap;
    }
}
