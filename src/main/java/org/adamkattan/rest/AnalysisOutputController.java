package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.output.AnalysisOutput;
import org.adamkattan.service.DiffService;

import java.util.Optional;

@Path("/analysis-outputs")
public class AnalysisOutputController {

    @Inject
    DiffService diffService;

    @POST
    @Path("/plain-diff")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response plainDiff(@Valid AnalysisInput analysisInput) {
        Optional<AnalysisOutput> plainDifference = diffService.getPlainDifference(analysisInput);

        return Response.status(200)
                .entity(plainDifference.isPresent() ? plainDifference.get() : "")
                .build();
    }

}
