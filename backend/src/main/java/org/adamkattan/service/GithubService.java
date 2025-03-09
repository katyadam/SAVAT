package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.model.github.GithubClient;
import org.adamkattan.model.github.GithubURLRequest;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.List;

@ApplicationScoped
public class GithubService {

    @Inject
    @RestClient
    GithubClient gitHubClient;

    public String getMethodUrl(GithubURLRequest request) {

        String filePath = request.ms() + "/src/main/java/" + request.classPath().replace(".", "/") + ".java";
        String fileUrl = String.format(
                "https://github.com/%s/%s/blob/%s/%s",
                request.owner(),
                request.repository(),
                request.branch(),
                filePath
        );
        String fileContent = gitHubClient.getFileContent(
                request.owner(),
                request.repository(),
                request.branch(),
                filePath
        );

        List<String> lines = fileContent.lines().toList();

        int lineNumber = -1;
        for (int i = 0; i < lines.size(); i++) {
            if (lines.get(i).contains(request.methodName())) {
                lineNumber = i + 1;
                break;
            }
        }

        return lineNumber > 0 ? fileUrl + "#L" + lineNumber : null;
    }

}
