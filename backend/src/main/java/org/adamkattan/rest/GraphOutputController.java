package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.graph.GraphLinksInputDto;
import org.adamkattan.model.graph.compare.ChangedGraph;
import org.adamkattan.model.graph.compare.ChangedGraphLinksOutput;
import org.adamkattan.service.GraphDifferenceService;

import java.util.List;

@Path("/graph")
public class GraphOutputController {

    @Inject
    GraphDifferenceService graphDifferenceService;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedGraph(@PathParam("id") Long id) {
        ChangedGraph changedGraph = graphDifferenceService.getChangedGraph(id);
        return Response.ok(
                ChangedGraph.toDto(changedGraph)
        ).build();
    }

    @GET
    @Path("/analysis-input/{analysisInputId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedGraphs(@PathParam("analysisInputId") Long analysisInputId) {
        List<ChangedGraph> changedGraphs = graphDifferenceService.getChangedGraphs(analysisInputId);
        return Response.ok(
                changedGraphs.stream()
                        .map(ChangedGraph::toDto)
        ).build();
    }

    @PUT
    @Path("/{analysisInputId}/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response compareGraphs(
            @Valid GraphLinksInputDto graphLinksInputDto,
            @PathParam("analysisInputId") Long srcId
    ) {
        ChangedGraphLinksOutput output = graphDifferenceService.saveChangedGraphLinks(graphLinksInputDto, srcId);
        return Response.ok(output).build();
    }

}
