package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.ContextMapLinksDifferenceAnalysis;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.contextmap.LinksInputDto;
import org.adamkattan.model.contextmap.linkdiff.ChangedContextMap;
import org.adamkattan.model.contextmap.linkdiff.ChangedLinksOutput;

import java.util.List;

@ApplicationScoped
public class ContextMapLinksDifferenceService {

    @Inject
    ContextMapService contextMapService;

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
        ChangedLinksOutput linksDifference = ContextMapLinksDifferenceAnalysis.getLinksDifference(
                contextMapEntity.contextMap.links(),
                linksInputDto.links()
        );
        var changedContextMap = new ChangedContextMap();
        changedContextMap.changedLinks = linksDifference.changedLinks();
        changedContextMap.contextMap = contextMapEntity;
        changedContextMap.persist();
        return linksDifference;
    }

}
