package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.SdgLinksDifferenceAnalysis;
import org.adamkattan.model.sdg.LinksInputDto;
import org.adamkattan.model.sdg.ServiceDependencyGraphEntity;
import org.adamkattan.model.sdg.compare.ChangedLinksOutput;
import org.adamkattan.model.sdg.compare.ChangedServiceDependecyGraph;

import java.util.List;

@ApplicationScoped
public class SdgLinksDifferenceService {

    @Inject
    SdgService sdgService;

    public ChangedServiceDependecyGraph getChangedGraph(Long id) {
        return ChangedServiceDependecyGraph.find("id", id).firstResult();
    }

    public List<ChangedServiceDependecyGraph> getChangedGraphs(Long sdgId) {
        return ChangedServiceDependecyGraph.find("sdg.id", sdgId).list();
    }

    public ChangedLinksOutput saveChangedGraphLinks(
            LinksInputDto linksInputDto,
            Long srcId
    ) {
        ServiceDependencyGraphEntity sdgEntity = sdgService.getSdgById(srcId);
        ChangedLinksOutput linksDifference = SdgLinksDifferenceAnalysis.getLinksDifference(
                sdgEntity.sdg.links(),
                linksInputDto.links()
        );
        var changedGraph = new ChangedServiceDependecyGraph();
        changedGraph.changedLinks = linksDifference.changedLinks();
        changedGraph.sdg = sdgEntity;
        changedGraph.persist();
        return linksDifference;
    }

    public ChangedLinksOutput saveChangedGraphLinks(
            Long sourceId,
            Long targetId
    ) {
        ServiceDependencyGraphEntity sourceSdgEntity = sdgService.getSdgById(sourceId);
        ServiceDependencyGraphEntity targetSdgEntity = sdgService.getSdgById(targetId);
        ChangedLinksOutput linksDifference = SdgLinksDifferenceAnalysis.getLinksDifference(
                sourceSdgEntity.sdg.links(),
                targetSdgEntity.sdg.links()
        );
        var changedGraph = new ChangedServiceDependecyGraph();
        changedGraph.changedLinks = linksDifference.changedLinks();
        changedGraph.sdg = sourceSdgEntity;
        changedGraph.persist();
        return linksDifference;
    }
}
