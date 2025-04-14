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
import org.adamkattan.model.callgraph.CallGraph;
import org.adamkattan.model.callgraph.CallGraphMethodKey;
import org.adamkattan.model.callgraph.algorithms.MethodReachability;
import org.adamkattan.model.callgraph.compare.CallGraphOutput;
import org.adamkattan.model.callgraph.compare.CallGraphOutputRequest;
import org.adamkattan.model.callgraph.compare.CallGraphOutputSimpleDto;
import org.adamkattan.service.CallGraphChangeImpactService;
import org.adamkattan.service.CallGraphOutputService;

import java.util.ArrayList;
import java.util.List;

@Path("/call-graph-outputs")
public class CallGraphOutputController {

    @Inject
    CallGraphChangeImpactService differenceService;

    @Inject
    CallGraphOutputService callGraphOutputService;

    @GET
    @Path("/project/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectCallGraphOutputs(@PathParam("projectId") Long projectId) { // TODO: move to ProjectController
        List<CallGraphOutput> allProjectOutputs = callGraphOutputService.getAllProjectOutputs(projectId);

        var dtos = allProjectOutputs.stream()
                .map(CallGraphOutput::toSimpleDto)
                .toList();
        return Response.ok(dtos).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCallGraphOutputById(@PathParam("id") Long id) {
        CallGraphOutput output = callGraphOutputService.getCallGraphOutputById(id);

        return Response.ok(
                CallGraphOutput.toFullDto(output)
        ).build();
    }


    @POST
    @Path("/change-impact-analysis")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Blocking
    @Transactional
    public Uni<CallGraphOutputSimpleDto> changeImpactAnalysis(
            @Valid CallGraphOutputRequest callGraphOutputRequest
    ) {
        return Uni.createFrom().item(
                        () -> CallGraphOutput.toSimpleDto(
                                differenceService.saveChangedCallGraph(
                                        callGraphOutputRequest.projectId(),
                                        callGraphOutputRequest.sourceCallGraphInputId(),
                                        callGraphOutputRequest.targetCallGraphInputId())
                        )
                )
                .runSubscriptionOn(Infrastructure.getDefaultExecutor());
    }

    @PUT
    @Path("/{callGraphOutputId}/method-reachability")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Blocking
    public Uni<CallGraph> computeMethodReachability(
            @PathParam("callGraphOutputId") Long callGraphOutputId,
            @Valid CallGraphMethodKey callGraphMethodKey
    ) {
        CallGraphOutput callGraphOutputById = callGraphOutputService.getCallGraphOutputById(callGraphOutputId);
        return Uni.createFrom().item(() -> MethodReachability.compute(
                        new CallGraph(
                                new ArrayList<>(callGraphOutputById.changedCallGraph.methods()),
                                callGraphOutputById.changedCallGraph.calls()
                        ),
                        callGraphMethodKey
                ))
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
