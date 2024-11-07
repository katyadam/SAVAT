package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.output.AnalysisOutput;
import org.adamkattan.model.output.ChangedMethodsOutput;
import org.adamkattan.model.output.DifferenceOutput;
import org.adamkattan.model.output.DifferenceType;
import org.adamkattan.service.DifferenceService;

import java.util.Optional;

@Path("/analysis-outputs")
public class AnalysisOutputController {

    @Inject
    DifferenceService differenceService;

    @POST
    @Path("/plain-diff")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response isDifferentThenLast(@Valid AnalysisInput analysisInput) {
        Optional<AnalysisOutput> plainDifference = differenceService.isDifferent(analysisInput);

        return Response.ok()
                .entity(plainDifference.isPresent() ? plainDifference.get() : "")
                .build();
    }

    @POST
    @Path("/json-diff/{type}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response jsonDiff(@Valid AnalysisInput analysisInput, @PathParam("type") DifferenceType type) {
        DifferenceOutput output = differenceService.getJsonDifference(analysisInput, type);
        return Response.ok(output).build();
    }

    @POST
    @Path("/methods-diff")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response methodsDiff(@Valid AnalysisInput analysisInput) {
        ChangedMethodsOutput output = differenceService.getChangedMethods(analysisInput);
        return Response.ok(output).build();
    }
}
