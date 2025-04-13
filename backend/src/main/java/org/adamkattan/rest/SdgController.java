package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.sdg.CreateServiceDependencyGraph;
import org.adamkattan.model.sdg.LinksInputDto;
import org.adamkattan.model.sdg.ServiceDependencyGraphEntity;
import org.adamkattan.model.sdg.ServiceDependencyGraphFullDto;
import org.adamkattan.model.sdg.compare.ChangedLinksOutput;
import org.adamkattan.model.sdg.compare.ChangedServiceDependecyGraph;
import org.adamkattan.model.sdg.compare.CompareSDGsRequest;
import org.adamkattan.service.SdgLinksDifferenceService;
import org.adamkattan.service.SdgService;

import java.util.List;

@Path("/sdgs")
public class SdgController {

    @Inject
    SdgService sdgService;

    @Inject
    SdgLinksDifferenceService sdgLinksDifferenceService;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getSdg(@PathParam("id") Long id) {
        ServiceDependencyGraphEntity sdgEntity = sdgService.getSdgById(id);
        return Response.ok(ServiceDependencyGraphEntity.toFullDto(sdgEntity))
                .build();
    }

    @GET
    @Path("/{id}/changes")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedSdgs(@PathParam("id") Long sdgId) {
        List<ChangedServiceDependecyGraph> changedGraphs = sdgLinksDifferenceService.getChangedGraphs(sdgId);
        return Response.ok(
                changedGraphs.stream()
                        .map(ChangedServiceDependecyGraph::toDto)
        ).build();
    }

    @GET
    @Path("/changes/{changeSdgId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedSdg(@PathParam("changeSdgId") Long changeSdgId) {
        ChangedServiceDependecyGraph changedGraph = sdgLinksDifferenceService.getChangedGraph(changeSdgId);
        return Response.ok(ChangedServiceDependecyGraph.toDto(changedGraph))
                .build();
    }

    @GET
    @Path("/{id}/summary")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getSdgSummary(@PathParam("id") Long sdgId) {
        return Response.ok(sdgService.getSdgSummary(sdgId))
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createSdg(@Valid CreateServiceDependencyGraph dto) {
        ServiceDependencyGraphFullDto createdSdg = sdgService.addSdgToProject(dto);
        return Response.status(Response.Status.CREATED)
                .entity(createdSdg)
                .build();
    }

    @POST
    @Path("/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response compareSdgs(@Valid CompareSDGsRequest req) {
        ChangedLinksOutput output = sdgLinksDifferenceService.saveChangedGraphLinks(req.sourceId(), req.targetId());
        return Response.ok(output)
                .build();
    }

    @PUT
    @Path("/{id}/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response compareSdgs(
            @Valid LinksInputDto graphLinksInputDto,
            @PathParam("id") Long srcId
    ) {
        ChangedLinksOutput output = sdgLinksDifferenceService.saveChangedGraphLinks(graphLinksInputDto, srcId);
        return Response.ok(output)
                .build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response deleteSdg(@PathParam("id") Long id) {
        Long removedId = sdgService.deleteSdgById(id);
        return Response.ok("Removed SDG with id: " + removedId)
                .build();
    }
}
