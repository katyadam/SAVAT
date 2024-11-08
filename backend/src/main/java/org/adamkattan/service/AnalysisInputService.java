package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputDto;
import org.adamkattan.model.project.Project;

import java.util.List;

@ApplicationScoped
public class AnalysisInputService {

    @Inject
    ProjectService projectService;

    public List<AnalysisInput> getProjectAnalysisInputs(Project project) {
        return AnalysisInput.find("project", project).list();
    }

    public AnalysisInput getProjectLatestAnalysisInputByVersion(Project project) {
        return AnalysisInput
                .find("project = ?1 ORDER BY string_to_array(version, '.') DESC", project)
                .firstResult();
    }

    public AnalysisInput getProjectLatestAnalysisInputByTimestamp(Project project) {
        return AnalysisInput
                .find("project = ?1 ORDER BY createdAt DESC", project)
                .firstResult();
    }

    public AnalysisInput addAnalysisInputToProject(AnalysisInputDto analysisInputDto) {
        var project = projectService.getProjectById(analysisInputDto.projectId());
        var analysisInput = new AnalysisInput();
        analysisInput.project = project;
        analysisInput.version = analysisInputDto.version();
        analysisInput.commitHash = analysisInputDto.commitHash();
        analysisInput.entities = analysisInputDto.entities();
        analysisInput.graph = analysisInputDto.graph();
        analysisInput.methods = analysisInputDto.methods();
        analysisInput.persist();
        return analysisInput;
    }
}
