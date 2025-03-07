package org.adamkattan.rest;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/sdgs")
public class SdgController {
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getSdg(@PathParam("id") Long id) {
        return Response.ok(
        ).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createSdg() {
        return Response.ok(
        ).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response deleteSdg(@PathParam("id") Long id) {
        return Response.ok(
        ).build();
    }
}
