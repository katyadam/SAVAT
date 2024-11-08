package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputDto;
import org.adamkattan.service.AnalysisInputService;

import java.util.List;

@Path("/analysis-inputs")
public class AnalysisInputController {

    @Inject
    AnalysisInputService analysisInputService;

    @GET
    @Path("/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectAnalysisInputs(@PathParam("projectId") Long projectId) {
        List<AnalysisInput> analysisInputs = analysisInputService.getProjectAnalysisInputs(projectId);

        if (analysisInputs.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

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

        return Response.ok(AnalysisInput.toDto(latestInput)).build();
    }

    @GET
    @Path("/latest-upload/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectLatestAnalysisInputByTimestamp(@PathParam("projectId") Long projectId) {
        AnalysisInput latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(projectId);

        if (latestInput == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(AnalysisInput.toDto(latestInput)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response addAnalysisInput(@Valid AnalysisInputDto analysisInputDto) {
        return Response.status(Response.Status.CREATED)
                .entity(analysisInputService.addAnalysisInputToProject(analysisInputDto))
                .build();
    }
}
