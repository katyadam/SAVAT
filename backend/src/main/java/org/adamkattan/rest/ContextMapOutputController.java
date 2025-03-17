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
import org.adamkattan.model.contextmap.output.CIAContextMap;
import org.adamkattan.model.contextmap.output.ContextMapOutput;
import org.adamkattan.model.contextmap.output.ContextMapOutputRequest;
import org.adamkattan.service.ContextMapChangeImpactService;
import org.adamkattan.service.ContextMapOutputService;

import java.util.List;

@Path("/context-maps-outputs")
public class ContextMapOutputController {

    @Inject
    ContextMapChangeImpactService contextMapChangeImpactService;

    @Inject
    ContextMapOutputService contextMapOutputService;

    @GET
    @Path("/project/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectAnalysisInputs(@PathParam("projectId") Long projectId) {
        List<ContextMapOutput> allProjectOutputs = contextMapOutputService.getAllProjectOutputs(projectId);

        var dtos = allProjectOutputs.stream()
                .map(ContextMapOutput::toDto)
                .toList();
        return Response.ok(dtos).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCallGraphOutputById(@PathParam("id") Long id) {
        ContextMapOutput output = contextMapOutputService.getContextMapOutputById(id);

        return Response.ok(output.changedContextMap).build();
    }

    @POST
    @Path("/change-impact-analysis")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Blocking
    @Transactional
    public Uni<CIAContextMap> changeImpactAnalysis(
            @Valid ContextMapOutputRequest request
    ) {
        return Uni.createFrom().item(
                        () -> contextMapChangeImpactService.saveChangedContextMap(
                                request.projectId(),
                                request.sourceContextMapId(),
                                request.targetContextMapId())
                )
                .runSubscriptionOn(Infrastructure.getDefaultExecutor());
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response deleteContextMapOutputById(@PathParam("id") Long id) {
        Long removedId = contextMapOutputService.deleteCallGraphOutputById(id);
        return Response.ok("Removed OUTPUT with id: " + removedId)
                .build();
    }

}
