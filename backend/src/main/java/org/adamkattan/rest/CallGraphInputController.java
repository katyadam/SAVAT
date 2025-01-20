package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.callgraph.CallGraphInput;
import org.adamkattan.model.callgraph.CallGraphInputDto;
import org.adamkattan.service.CallGraphInputService;

import java.util.List;

@Path("/call-graph-inputs")
public class CallGraphInputController {

    @Inject
    CallGraphInputService callGraphInputService;

    @GET
    @Path("/project/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectAnalysisInputs(@PathParam("projectId") Long projectId) { // TODO: move to ProjectController
        List<CallGraphInput> projectCallGraphInputs = callGraphInputService.getProjectCallGraphInputs(projectId);

        var dtos = projectCallGraphInputs.stream()
                .map(CallGraphInput::toDto)
                .toList();
        return Response.ok(dtos).build();
    }

    @GET
    @Path("/{call-graph-input-id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCallGraphInputById(@PathParam("call-graph-input-id") Long callGraphInputId) {
        CallGraphInput callGraphInput = callGraphInputService.getCallGraphInputById(callGraphInputId);
        return Response.ok(CallGraphInput.toDto(callGraphInput)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response addCallGraphInput(@Valid CallGraphInputDto callGraphInputDto) {
        return Response.status(Response.Status.CREATED)
                .entity(callGraphInputService.addCallGraphInputToProject(callGraphInputDto))
                .build();
    }

}
