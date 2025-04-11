package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.contextmap.ContextMapFullDto;
import org.adamkattan.model.contextmap.CreateContextMap;
import org.adamkattan.model.contextmap.LinksInputDto;
import org.adamkattan.model.contextmap.linkdiff.ChangedContextMap;
import org.adamkattan.model.contextmap.linkdiff.ChangedLinksOutput;
import org.adamkattan.model.contextmap.linkdiff.CompareContextMapsRequest;
import org.adamkattan.service.ContextMapLinksDifferenceService;
import org.adamkattan.service.ContextMapService;

import java.util.List;

@Path("/context-maps")
public class ContextMapController {

    @Inject
    ContextMapService contextMapService;

    @Inject
    ContextMapLinksDifferenceService contextMapLinksDifferenceService;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getContextMap(@PathParam("id") Long id) {
        ContextMapEntity contextMapEntity = contextMapService.getContextMapById(id);
        return Response.ok(
                ContextMapEntity.toFullDto(contextMapEntity)
        ).build();
    }

    @GET
    @Path("/{id}/changes")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedContextMaps(@PathParam("id") Long contextMapId) {
        List<ChangedContextMap> changedContextMaps = contextMapLinksDifferenceService.getChangedContextMaps(contextMapId);
        return Response.ok(
                changedContextMaps.stream()
                        .map(ChangedContextMap::toDto)
        ).build();
    }

    @GET
    @Path("/changes/{changedContextMapId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedContextMap(@PathParam("changedContextMapId") Long changedContextMapId) {
        ChangedContextMap changedContextMap = contextMapLinksDifferenceService.getChangedContextMap(changedContextMapId);
        return Response.ok(ChangedContextMap.toDto(changedContextMap))
                .build();
    }

    @GET
    @Path("/{id}/summary")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getContextMapSummary(@PathParam("id") Long contextMapId) {
        return Response.ok(contextMapService.getContextMapSummary(contextMapId))
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createContextMap(@Valid CreateContextMap dto) {
        ContextMapFullDto createdContextMap = contextMapService.addContextMapToProject(dto);
        return Response.status(Response.Status.CREATED)
                .entity(createdContextMap)
                .build();
    }

    @POST
    @Path("/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createContextMap(@Valid CompareContextMapsRequest req) {
        ChangedLinksOutput output = contextMapLinksDifferenceService.saveChangedLinks(req.sourceId(), req.targetId());
        return Response.ok(output)
                .build();
    }

    @PUT
    @Path("/{id}/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response compareContextMaps(
            @Valid LinksInputDto linksInputDto,
            @PathParam("id") Long srcId
    ) {
        ChangedLinksOutput output = contextMapLinksDifferenceService.saveChangedLinks(linksInputDto, srcId);
        return Response.ok(output)
                .build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response deleteContextMap(@PathParam("id") Long id) {
        Long removedId = contextMapService.deleteContextMapById(id);
        return Response.ok("Removed Context Map with id: " + removedId)
                .build();
    }
}
