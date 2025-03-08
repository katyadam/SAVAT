package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityNotFoundException;
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
        project.contextMaps = new ArrayList<>();
        project.sdgs = new ArrayList<>();
        project.persist();
        return project;
    }

    public List<ProjectDto> getAllProjects() {
        return Project.<Project>listAll().stream()
                .map(Project::toDto)
                .toList();
    }

    public Long deleteProject(Long projectId) {
        Project project = Project.find("id", projectId).firstResult();
        if (project != null) {
            project.contextMaps.clear();
            project.sdgs.clear();
            project.callGraphInputs.clear();
            project.callGraphOutputs.clear();
            project.persist();
            project.delete();
            return project.id;
        }
        throw new EntityNotFoundException("Project with id: " + projectId + " was not found");
    }

}
