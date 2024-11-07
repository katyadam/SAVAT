package org.adamkattan.model.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.QueryParam;

public class AnalysisInputQuery {
    @NotBlank(message = "projectName is required")
    @QueryParam("projectName")
    public String projectName;
}
