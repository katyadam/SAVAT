package org.adamkattan.model;

import jakarta.validation.constraints.NotBlank;

public class AnalysisInputQuery {

    @NotBlank(message = "appName is required")
    public String appName;
}
