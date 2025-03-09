package org.adamkattan.model.github;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@ApplicationScoped
@RegisterRestClient(baseUri = "https://raw.githubusercontent.com")
public interface GithubClient {

    @GET
    @Path("/{owner}/{repo}/{branch}/{filePath}")
    String getFileContent(@PathParam("owner") String owner,
                          @PathParam("repo") String repo,
                          @PathParam("branch") String branch,
                          @PathParam("filePath") String filePath);
}
