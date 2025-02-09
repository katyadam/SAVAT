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
import org.adamkattan.service.DifferenceService;


@Path("/analysis-outputs")
public class AnalysisOutputController {

    @Inject
    DifferenceService differenceService;

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
