package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.entities.compare.ChangedEntity;
import org.adamkattan.model.graph.compare.ChangedGraph;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputFullDto;
import org.adamkattan.model.input.AnalysisInputSummary;
import org.adamkattan.service.AnalysisInputService;
import org.adamkattan.service.EntitiesDifferenceService;
import org.adamkattan.service.GraphDifferenceService;

import java.util.List;

@Path("/analysis-inputs")
public class AnalysisInputController {

    @Inject
    AnalysisInputService analysisInputService;

    @Inject
    EntitiesDifferenceService entitiesDifferenceService;

    @Inject
    GraphDifferenceService graphDifferenceService;

    @GET
    @Path("/{projectId}") // TODO: should be /project/{projectId}
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectAnalysisInputs(@PathParam("projectId") Long projectId) { // TODO: move to ProjectController
        List<AnalysisInput> analysisInputs = analysisInputService.getProjectAnalysisInputs(projectId);

        var dtos = analysisInputs.stream()
                .map(AnalysisInput::toDto)
                .toList();
        return Response.ok(dtos).build();
    }

    @GET
    @Path("/latest/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectLatestAnalysisInputByVersion(@PathParam("projectId") Long projectId) {
        AnalysisInput latestInput = analysisInputService.getProjectLatestAnalysisInputByVersion(projectId);

        if (latestInput == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(AnalysisInput.toFullDto(latestInput)).build();
    }

    @GET
    @Path("/latest-upload/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectLatestAnalysisInputByTimestamp(@PathParam("projectId") Long projectId) {
        AnalysisInput latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(projectId);

        if (latestInput == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(AnalysisInput.toFullDto(latestInput)).build();
    }

    @GET
    @Path("/{id}/summary")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getAnalysisInputSummary(@PathParam("id") Long analysisInputId) {
        List<ChangedEntity> changedEntities = entitiesDifferenceService.getChangedEntities(analysisInputId);
        List<ChangedGraph> changedGraphs = graphDifferenceService.getChangedGraphs(analysisInputId);
        AnalysisInputSummary summary = new AnalysisInputSummary(changedEntities.size(), changedGraphs.size());
        return Response.ok(summary)
                .build();
    }

    @GET
    @Path("/{id}/entities")
    @Transactional
    public Response getAnalysisInputEntities(@PathParam("id") Long id) {
        return Response.ok(analysisInputService.getAnalysisInputEntities(id))
                .build();
    }

    @GET
    @Path("/{id}/graph")
    @Transactional
    public Response getAnalysisInputGraph(@PathParam("id") Long id) {
        return Response.ok(analysisInputService.getAnalysisInputGraph(id))
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createAnalysisInput(@Valid AnalysisInputFullDto analysisInputDto) {
        return Response.status(Response.Status.CREATED)
                .entity(analysisInputService.addAnalysisInputToProject(analysisInputDto))
                .build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response deleteAnalysisInputById(@PathParam("id") Long id) {
        Long removedId = analysisInputService.deleteAnalysisInputById(id);
        return Response.ok("Removed ANALYSIS INPUT with id: " + removedId)
                .build();
    }
}
