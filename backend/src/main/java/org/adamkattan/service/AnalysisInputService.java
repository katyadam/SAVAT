package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.CreateAnalysisInputDto;

import java.util.List;

@ApplicationScoped
public class AnalysisInputService {

    @Inject
    ProjectService projectService;

    public List<AnalysisInput> getProjectAnalysisInputs(Long projectId) {
        return AnalysisInput.find("project.id", projectId).list();
    }

    public AnalysisInput getProjectLatestAnalysisInputByVersion(Long projectId) {
        return AnalysisInput
                .find("project.id = ?1 ORDER BY string_to_array(version, '.') DESC", projectId)
                .firstResult();
    }

    public AnalysisInput getProjectLatestAnalysisInputByTimestamp(Long projectId) {
        return AnalysisInput
                .find("project.id = ?1 ORDER BY createdAt DESC", projectId)
                .firstResult();
    }

    public AnalysisInput addAnalysisInputToProject(CreateAnalysisInputDto analysisInputDto) {
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
