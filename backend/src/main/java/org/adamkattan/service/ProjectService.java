package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.adamkattan.model.project.CreateProjectDto;
import org.adamkattan.model.project.Project;

import java.util.ArrayList;

@ApplicationScoped
public class ProjectService {

    public Project getProjectByName(String projectName) {
        return Project.find("projectName", projectName).firstResult();
    }

    public Project getProjectById(Long projectId) {
        return Project.find("id", projectId).firstResult();
    }

    public Project createProject(CreateProjectDto projectDto) {
        var project = new Project();
        project.projectName = projectDto.projectName();
        project.inputs = new ArrayList<>();
        project.outputs = new ArrayList<>();
        project.persist();
        return project;
    }

}
