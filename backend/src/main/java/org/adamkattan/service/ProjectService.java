package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.adamkattan.model.project.Project;

@ApplicationScoped
public class ProjectService {

    public Project getProjectByName(String projectName) {
        return Project.find("projectName", projectName).firstResult();
    }

}
