package org.adamkattan.rest;

import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.infrastructure.Infrastructure;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.callgraph.compare.CallGraphOutput;
import org.adamkattan.model.callgraph.compare.CallGraphOutputRequest;
import org.adamkattan.model.callgraph.compare.ChangedCallGraph;
import org.adamkattan.service.CallGraphDifferenceService;
import org.adamkattan.service.CallGraphOutputService;

import java.util.List;

@Path("/call-graph-outputs")
public class CallGraphOutputController {

    @Inject
    CallGraphDifferenceService differenceService;

    @Inject
    CallGraphOutputService callGraphOutputService;

    @GET
    @Path("/project/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllProjectOutputs(@PathParam("projectId") Long projectId) {
        List<CallGraphOutput> outputs = callGraphOutputService.getAllProjectOutputs(projectId);

        return Response.ok(outputs.stream()
                .map(CallGraphOutput::toSimpleDto)
        ).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChangedCallGraphById(@PathParam("id") Long id) {
        CallGraphOutput output = callGraphOutputService.getCallGraphOutputById(id);

        return Response.ok(output.changedCallGraph).build();
    }


    @POST
    @Path("/change-impact-analysis")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Blocking
    @Transactional
    public Uni<ChangedCallGraph> changeImpactAnalysis(
            @Valid CallGraphOutputRequest callGraphOutputRequest
    ) {
        return Uni.createFrom().item(
                        () -> differenceService.saveChangedCallGraph(
                                callGraphOutputRequest.sourceCallGraphInputId(),
                                callGraphOutputRequest.targetCallGraphInputId())
                )
                .runSubscriptionOn(Infrastructure.getDefaultExecutor());
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response deleteCallGraphOutputById(@PathParam("id") Long id) {
        Long removedId = callGraphOutputService.deleteCallGraphOutputById(id);
        return Response.ok("Removed OUTPUT with id: " + removedId)
                .build();
    }

}
