package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.contextmap.LinksInputDto;
import org.adamkattan.model.contextmap.compare.ChangedLinksOutput;
import org.adamkattan.model.contextmap.compare.ChangedContextMap;
import org.adamkattan.service.ContextMapChangeImpactService;

import java.util.List;

@Path("/entities")
public class EntitiesOutputController {

    @Inject
    ContextMapChangeImpactService contextMapChangeImpactService;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedEntity(@PathParam("id") Long id) {
        ChangedContextMap changedContextMap = contextMapChangeImpactService.getChangedEntity(id);
        return Response.ok(
                ChangedContextMap.toDto(changedContextMap)
        ).build();
    }

    @GET
    @Path("/analysis-input/{analysisInputId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedEntities(@PathParam("analysisInputId") Long analysisInputId) {
        List<ChangedContextMap> changedEntities = contextMapChangeImpactService.getChangedEntities(analysisInputId);
        return Response.ok(
                changedEntities.stream()
                        .map(ChangedContextMap::toDto)
        ).build();
    }

    @PUT
    @Path("/{analysisInputId}/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response compareEntities(
            @Valid LinksInputDto entitiesLinksInputDto,
            @PathParam("analysisInputId") Long srcId
    ) {
        ChangedLinksOutput output = contextMapChangeImpactService.saveChangedEntitiesLinks(entitiesLinksInputDto, srcId);
        return Response.ok(output).build();
    }
}
