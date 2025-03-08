package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.project.CreateProjectDto;
import org.adamkattan.model.project.Project;
import org.adamkattan.model.project.ProjectSummary;
import org.adamkattan.model.sdg.ServiceDependencyGraphEntity;
import org.adamkattan.service.ContextMapService;
import org.adamkattan.service.ProjectService;
import org.adamkattan.service.SdgService;

@Path("/projects")
public class ProjectController {

    @Inject
    ProjectService projectService;

    @Inject
    ContextMapService contextMapService;

    @Inject
    SdgService sdgService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllProjects() {
        return Response.ok(projectService.getAllProjects())
                .build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProject(@PathParam("id") Long id) {
        return Response.ok(Project.toDto(projectService.getProjectById(id)))
                .build();
    }

    @GET
    @Path("{id}/context-maps")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectContextMaps(@PathParam("id") Long id) {
        return Response.ok(
                contextMapService.getProjectContextMaps(id).stream()
                        .map(ContextMapEntity::toDto)
        ).build();
    }

    @GET
    @Path("{id}/sdgs")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjectServiceDependencyGraphs(@PathParam("id") Long id) {
        return Response.ok(
                sdgService.getProjectSdgs(id).stream()
                        .map(ServiceDependencyGraphEntity::toDto)
        ).build();
    }

    @GET
    @Path("{id}/summary")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSummary(@PathParam("id") Long id) {
        Project project = projectService.getProjectById(id);
        ProjectSummary projectSummary = new ProjectSummary(
                project.sdgs.size(),
                project.contextMaps.size(),
                project.callGraphInputs.size(),
                project.callGraphOutputs.size()
        );
        return Response.ok(projectSummary)
                .build();
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createProject(CreateProjectDto projectDto) {
        return Response.status(Response.Status.CREATED)
                .entity(Project.toDto(projectService.createProject(projectDto)))
                .build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response deleteProjectById(@PathParam("id") Long id) {
        Long removedId = projectService.deleteProject(id);
        return Response.ok("Removed Project with id: " + removedId)
                .build();
    }
}
