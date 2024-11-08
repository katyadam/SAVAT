package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputDto;
import org.adamkattan.model.input.AnalysisInputQuery;
import org.adamkattan.model.project.Project;
import org.adamkattan.service.AnalysisInputService;
import org.adamkattan.service.ProjectService;

import java.util.List;

@Path("/analysis-inputs")
public class AnalysisInputController {

    @Inject
    AnalysisInputService analysisInputService;

    @Inject
    ProjectService projectService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectAnalysisInputs(@Valid @BeanParam AnalysisInputQuery query) {
        Project project = projectService.getProjectByName(query.projectName);
        List<AnalysisInput> analysisInput = analysisInputService.getProjectAnalysisInputs(project);

        if (analysisInput.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(analysisInput).build();
    }

    @GET
    @Path("/latest")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectLatestAnalysisInputByVersion(@Valid @BeanParam AnalysisInputQuery query) {
        Project project = projectService.getProjectByName(query.projectName);
        AnalysisInput latestInput = analysisInputService.getProjectLatestAnalysisInputByVersion(project);

        if (latestInput == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(latestInput).build();
    }

    @GET
    @Path("/latest-upload")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectLatestAnalysisInputByTimestamp(@Valid @BeanParam AnalysisInputQuery query) {
        Project project = projectService.getProjectByName(query.projectName);
        AnalysisInput latestInput = analysisInputService.getProjectLatestAnalysisInputByTimestamp(project);

        if (latestInput == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(latestInput).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response addAnalysisInput(@Valid AnalysisInputDto analysisInputDto) {
        return Response.status(Response.Status.CREATED)
                .entity(analysisInputService.addAnalysisInputToProject(analysisInputDto))
                .build();
    }
}
