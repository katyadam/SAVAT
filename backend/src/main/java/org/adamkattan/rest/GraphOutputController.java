package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.graph.GraphLinksInputDto;
import org.adamkattan.model.graph.compare.ChangedGraphLinksOutput;
import org.adamkattan.service.GraphDifferenceService;

@Path("/graph")
public class GraphOutputController {

    @Inject
    GraphDifferenceService graphDifferenceService;

    @PUT
    @Path("/{analysisInputId}/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response compareEntities(
            @Valid GraphLinksInputDto graphLinksInputDto,
            @PathParam("analysisInputId") Long srcId
    ) {
        ChangedGraphLinksOutput output = graphDifferenceService.getChangedGraphLinks(graphLinksInputDto, srcId);
        return Response.ok(output).build();
    }

}
