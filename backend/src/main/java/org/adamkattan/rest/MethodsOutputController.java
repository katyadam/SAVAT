package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.methods.MethodsInputDto;
import org.adamkattan.model.output.ChangedMethodsOutput;
import org.adamkattan.service.MethodsDifferenceService;

import java.util.Optional;

@Path("/methods")
public class MethodsOutputController {

    @Inject
    MethodsDifferenceService methodsDifferenceService;

    @PUT
    @Path("/analysis-input/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedMethods(@Valid MethodsInputDto methodsInputDtoDest, @PathParam("id") Long srcId) {
        Optional<ChangedMethodsOutput> output = methodsDifferenceService.getChangedMethods(srcId, methodsInputDtoDest);
        if (output.isEmpty())
            return Response.status(Response.Status.CONFLICT).build();
        return Response.ok(output).build();
    }

    @PUT
    @Path("/project/{id}/latest/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response methodsDiffLatest(@Valid MethodsInputDto methodsInputDtoDest, @PathParam("id") Long projectId) {
        ChangedMethodsOutput output = methodsDifferenceService.getChangedMethodsLatest(projectId, methodsInputDtoDest);
        return Response.ok(output).build();
    }
}
