package org.adamkattan.tempapi;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Path("/api/files")
public class IRResource {

    public static final String IRS_PATH = "/home/adamkattan/muni/change-impact-analysis/frontend/public/irs";

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> listJsonFiles() throws IOException {
        try (DirectoryStream<java.nio.file.Path> stream = Files.newDirectoryStream(Paths.get(IRS_PATH), "*.json")) {
            return StreamSupport.stream(stream.spliterator(), false)
                    .map(path -> path.getFileName().toString())
                    .collect(Collectors.toList());
        }
    }

}
