package org.adamkattan.rest;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.adamkattan.model.github.GithubURLRequest;
import org.adamkattan.service.GithubService;

@Path("/github")
public class GithubController {

    @Inject
    GithubService githubService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMethodsGithubURL(@Valid GithubURLRequest request) {
        String methodUrl = githubService.getMethodUrl(request);
        return Response.ok(methodUrl).build();
    }

}
