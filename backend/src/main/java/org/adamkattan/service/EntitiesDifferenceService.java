package org.adamkattan.service;

import jakarta.inject.Inject;
import org.adamkattan.analysis.EntitiesDifferenceAnalysis;
import org.adamkattan.model.entities.Entities;
import org.adamkattan.model.entities.EntitiesLinksInputDto;
import org.adamkattan.model.output.ChangedEntitiesLinksOutput;

public class EntitiesDifferenceService {

    @Inject
    AnalysisInputService analysisInputService;

    public ChangedEntitiesLinksOutput getChangedEntitiesLinks(
            EntitiesLinksInputDto entitiesLinksInputDto,
            Long srcId
    ) {
        Entities analysisInputEntities = analysisInputService.getAnalysisInputEntities(srcId);
        return EntitiesDifferenceAnalysis.getLinksDifference(
                analysisInputEntities.links(),
                entitiesLinksInputDto.links()
        );
    }
}
