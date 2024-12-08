package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.entities.EntitiesLinksInputDto;
import org.adamkattan.model.output.ChangedEntitiesLinksOutput;
import org.adamkattan.model.output.ChangedEntity;
import org.adamkattan.service.EntitiesDifferenceService;

import java.util.List;

@Path("/entities")
public class EntitiesOutputController {

    @Inject
    EntitiesDifferenceService entitiesDifferenceService;


    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedEntity(@PathParam("id") Long id) {
        ChangedEntity changedEntity = entitiesDifferenceService.getChangedEntity(id);
        return Response.ok(
                ChangedEntity.toDto(changedEntity)
        ).build();
    }

    @GET
    @Path("/analysis-input/{analysisInputId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getAnalysisInputEntitiesOutputs(@PathParam("analysisInputId") Long analysisInputId) {
        List<ChangedEntity> changedEntities = entitiesDifferenceService.getChangedEntities(analysisInputId);
        return Response.ok(
                changedEntities.stream()
                        .map(ChangedEntity::toDto)
        ).build();
    }

    @PUT
    @Path("/{analysisInputId}/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response compareEntities(
            @Valid EntitiesLinksInputDto entitiesLinksInputDto,
            @PathParam("analysisInputId") Long srcId
    ) {
        ChangedEntitiesLinksOutput output = entitiesDifferenceService.saveChangedEntitiesLinks(entitiesLinksInputDto, srcId);
        return Response.ok(output).build();
    }
}
