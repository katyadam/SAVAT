package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputQuery;
import org.adamkattan.service.AnalysisInputService;

@Path("/analysis-inputs")
public class AnalysisInputController {

    @Inject
    AnalysisInputService analysisInputService;

    @Inject
    EntityManager entityManager;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAppAnalysisInputs(@Valid @BeanParam AnalysisInputQuery query) {
        var analysisInput = analysisInputService.getAppAnalysisInputs(query);

        if (analysisInput.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND)
                    .build();
        }

        return Response.ok(analysisInput).build();
    }

    @GET
    @Path("/latest")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAppLatestAnalysisInputByVersion(@Valid @BeanParam AnalysisInputQuery query) {
        AnalysisInput latestInput = analysisInputService.getAppLatestAnalysisInputByVersion(query);

        if (latestInput == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("No analysis input found")
                    .build();
        }

        return Response.ok(latestInput).build();
    }

    @GET
    @Path("/latest-upload")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAppLatestAnalysisInputByTimestamp(@Valid @BeanParam AnalysisInputQuery query) {
        AnalysisInput latestInput = analysisInputService.getAppLatestAnalysisInputByTimestamp(query);

        if (latestInput == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("No analysis input found")
                    .build();
        }

        return Response.ok(latestInput).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response postAnalysisInput(@Valid AnalysisInput analysisInput) {
        AnalysisInput newAnalysisInput = entityManager.merge(analysisInput);
        return Response.ok(newAnalysisInput).build();
    }
}
