package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.analysis.EntitiesDifferenceAnalysis;
import org.adamkattan.model.entities.EntitiesLinksInputDto;
import org.adamkattan.model.input.AnalysisInputFullDto;
import org.adamkattan.model.methods.MethodsInputDto;
import org.adamkattan.model.output.*;
import org.adamkattan.service.DifferenceService;
import org.adamkattan.service.EntitiesDifferenceService;

import java.util.Optional;

@Path("/analysis-outputs")
public class AnalysisOutputController {

    @Inject
    DifferenceService differenceService;

    @Inject
    EntitiesDifferenceService entitiesDifferenceService;

    @POST
    @Path("/plain-diff")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response isDifferentThenLast(@Valid AnalysisInputFullDto analysisInputDto) {
        Optional<PlainDifferenceOutput> plainDifference = differenceService.isDifferent(analysisInputDto);

        return Response.ok()
                .entity(plainDifference.isPresent() ? plainDifference.get() : "")
                .build();
    }

    @POST
    @Path("/json-diff/{type}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response jsonDiff(@Valid AnalysisInputFullDto analysisInputFullDto, @PathParam("type") DifferenceType type) {
        DifferenceOutput output = differenceService.getJsonDifference(analysisInputFullDto, type);
        return Response.ok(output).build();
    }

    @PUT
    @Path("/{analysisInputId}/methods-diff")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response methodsDiff(@Valid MethodsInputDto methodsInputDtoDest, @PathParam("analysisInputId") Long srcId) {
        Optional<ChangedMethodsOutput> output = differenceService.getChangedMethods(srcId, methodsInputDtoDest);
        if (output.isEmpty())
            return Response.status(Response.Status.CONFLICT).build();
        return Response.ok(output).build();
    }

    @PUT
    @Path("/methods-diff/latest/{projectId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response methodsDiffLatest(@Valid MethodsInputDto methodsInputDtoDest, @PathParam("projectId") Long projectId) {
        ChangedMethodsOutput output = differenceService.getChangedMethodsLatest(projectId, methodsInputDtoDest);
        return Response.ok(output).build();
    }

    @PUT
    @Path("/{analysisInputId}/entities-links-diff")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response entitiesLinkDiff(
            @Valid EntitiesLinksInputDto methodsInputDtoDest,
            @PathParam("analysisInputId") Long srcId
    ) {
        ChangedEntitiesLinksOutput output = entitiesDifferenceService.getChangedEntitiesLinks(methodsInputDtoDest, srcId);
        return Response.ok(output).build();
    }
}
