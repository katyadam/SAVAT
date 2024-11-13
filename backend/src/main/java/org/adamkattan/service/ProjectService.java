package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.adamkattan.model.project.CreateProjectDto;
import org.adamkattan.model.project.Project;
import org.adamkattan.model.project.ProjectDto;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ProjectService {

    public Project getProjectById(Long projectId) {
        return Project.find("id", projectId).firstResult();
    }

    public Project createProject(CreateProjectDto projectDto) {
        var project = new Project();
        project.projectName = projectDto.projectName();
        project.inputs = new ArrayList<>();
        project.persist();
        return project;
    }

    public List<ProjectDto> getAllProjects() {
        return Project.<Project>listAll().stream()
                .map(Project::toDto)
                .toList();
    }

}
