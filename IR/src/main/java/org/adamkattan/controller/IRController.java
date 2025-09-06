package org.adamkattan.controller;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Path("/files")
public class IRController {

    @ConfigProperty(name = "irs.path")
    String irsPath;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> listJsonFiles() throws IOException {
        try (DirectoryStream<java.nio.file.Path> stream = Files.newDirectoryStream(Paths.get(irsPath), "*.json")) {
            return StreamSupport.stream(stream.spliterator(), false)
                    .map(path -> path.getFileName().toString())
                    .collect(Collectors.toList());
        }
    }

}
