package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputFullDto;
import org.adamkattan.service.AnalysisInputService;

import java.util.List;

@Path("/analysis-inputs")
public class AnalysisInputController {

    @Inject
    AnalysisInputService analysisInputService;

    @GET
    @Path("/{projectId}")
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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response addAnalysisInput(@Valid AnalysisInputFullDto analysisInputDto) {
        return Response.status(Response.Status.CREATED)
                .entity(analysisInputService.addAnalysisInputToProject(analysisInputDto))
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

    @GET
    @Path("/{id}/methods")
    @Transactional
    public Response getAnalysisInputMethods(@PathParam("id") Long id) {
        return Response.ok(analysisInputService.getAnalysisInputMethods(id))
                .build();
    }
}
