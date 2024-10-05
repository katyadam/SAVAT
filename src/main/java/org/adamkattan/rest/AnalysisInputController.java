package org.adamkattan.rest;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.AnalysisInput;
import org.adamkattan.model.AnalysisInputQuery;

@Path("/analysis-inputs")
public class AnalysisInputController {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAppAnalysisInputs(@Valid @BeanParam AnalysisInputQuery query) {
        var analysisInput = AnalysisInput.find("appName", query.appName).list();
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
        AnalysisInput latestInput = AnalysisInput
                .find("appName = ?1 ORDER BY string_to_array(version, '.')::int[] DESC", query.appName)
                .firstResult();

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
        AnalysisInput latestInput = AnalysisInput
                .find("appName = ?1 ORDER BY createdAt DESC", query.appName)
                .firstResult();

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
        analysisInput.persist();
        return Response.ok(analysisInput).build();
    }
}
