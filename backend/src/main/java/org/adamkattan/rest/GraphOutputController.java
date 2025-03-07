package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.sdg.LinksInputDto;
import org.adamkattan.model.sdg.compare.ChangedServiceDependecyGraph;
import org.adamkattan.model.sdg.compare.ChangedLinksOutput;
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
        ChangedServiceDependecyGraph changedServiceDependecyGraph = graphDifferenceService.getChangedGraph(id);
        return Response.ok(
                ChangedServiceDependecyGraph.toDto(changedServiceDependecyGraph)
        ).build();
    }

    @GET
    @Path("/analysis-input/{analysisInputId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getChangedGraphs(@PathParam("analysisInputId") Long analysisInputId) {
        List<ChangedServiceDependecyGraph> changedGraphs = graphDifferenceService.getChangedGraphs(analysisInputId);
        return Response.ok(
                changedGraphs.stream()
                        .map(ChangedServiceDependecyGraph::toDto)
        ).build();
    }

    @PUT
    @Path("/{analysisInputId}/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response compareGraphs(
            @Valid LinksInputDto graphLinksInputDto,
            @PathParam("analysisInputId") Long srcId
    ) {
        ChangedLinksOutput output = graphDifferenceService.saveChangedGraphLinks(graphLinksInputDto, srcId);
        return Response.ok(output).build();
    }

}
