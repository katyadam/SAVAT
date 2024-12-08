package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.EntitiesDifferenceAnalysis;
import org.adamkattan.model.entities.EntitiesLinksInputDto;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.output.ChangedEntitiesLinksOutput;
import org.adamkattan.model.output.ChangedEntity;

import java.util.List;

@ApplicationScoped
public class EntitiesDifferenceService {

    @Inject
    AnalysisInputService analysisInputService;

    public ChangedEntity getChangedEntity(Long id) {
        return ChangedEntity.find("id", id).firstResult();
    }

    public List<ChangedEntity> getChangedEntities(Long analysisInputId) {
        return ChangedEntity.find("analysisInput.id", analysisInputId).list();
    }

    public ChangedEntitiesLinksOutput saveChangedEntitiesLinks(
            EntitiesLinksInputDto entitiesLinksInputDto,
            Long srcId
    ) {
        AnalysisInput analysisInput = analysisInputService.getAnalysisInputById(srcId);
        ChangedEntitiesLinksOutput linksDifference = EntitiesDifferenceAnalysis.getLinksDifference(
                analysisInput.entities.links(),
                entitiesLinksInputDto.links()
        );
        var changedEntity = new ChangedEntity();
        changedEntity.changedLinks = linksDifference.changedLinks();
        changedEntity.analysisInput = analysisInput;
        changedEntity.persist();
        return linksDifference;
    }
}
