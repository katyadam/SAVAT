package org.adamkattan.rest;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/context-maps")
public class ContextMapController {

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getContextMap(@PathParam("id") Long id) {
        return Response.ok(
        ).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createContextMap() {
        return Response.ok(
        ).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response deleteContextMap(@PathParam("id") Long id) {
        return Response.ok(
        ).build();
    }
}
