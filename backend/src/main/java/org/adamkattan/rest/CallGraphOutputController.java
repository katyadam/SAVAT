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
import org.adamkattan.model.callgraph.compare.ChangedCallGraph;
import org.adamkattan.model.callgraph.compare.ChangedCallGraphInput;
import org.adamkattan.model.callgraph.compare.ChangedCallGraphInputRequest;
import org.adamkattan.service.CallGraphAnalysisService;
import org.adamkattan.service.CallGraphDifferenceService;

import java.util.List;

@Path("/call-graph-outputs")
public class CallGraphOutputController {

    @Inject
    CallGraphDifferenceService differenceService;

    @Inject
    CallGraphAnalysisService callGraphAnalysisService;

    @GET
    @Path("/project/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllProjectOutputs(@PathParam("projectId") Long projectId) {
        List<ChangedCallGraphInput> outputs = callGraphAnalysisService.getAllProjectOutputs(projectId);

        return Response.ok(outputs.stream()
                .map(ChangedCallGraphInput::toSimpleDto)
        ).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChangedCallGraphById(@PathParam("id") Long id) {
        ChangedCallGraphInput output = callGraphAnalysisService.getChangedCallGraphInputById(id);

        return Response.ok(output.changedCallGraph).build();
    }


    @POST
    @Path("/change-impact-analysis")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Blocking
    @Transactional
    public Uni<ChangedCallGraph> changeImpactAnalysis(
            @Valid ChangedCallGraphInputRequest changedCallGraphInputRequest
    ) {
        return Uni.createFrom().item(
                        () -> differenceService.saveChangedCallGraph(
                                changedCallGraphInputRequest.sourceCallGraphInputId(),
                                changedCallGraphInputRequest.targetCallGraphInputId())
                )
                .runSubscriptionOn(Infrastructure.getDefaultExecutor());
    }

}
