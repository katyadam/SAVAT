package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.input.AnalysisInputFullDto;
import org.adamkattan.model.output.DifferenceOutput;
import org.adamkattan.model.output.DifferenceType;
import org.adamkattan.model.output.PlainDifferenceOutput;
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
}
