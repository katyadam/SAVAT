package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.model.entities.Entities;
import org.adamkattan.model.graph.Graph;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputFullDto;
import org.adamkattan.model.methods.MicroserviceNode;

import java.util.List;

@ApplicationScoped
public class AnalysisInputService {

    @Inject
    ProjectService projectService;

    public AnalysisInput getAnalysisInputById(Long id) {
        return AnalysisInput.find("id", id).firstResult();
    }

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

    public AnalysisInputFullDto addAnalysisInputToProject(AnalysisInputFullDto analysisInputDto) {
        var project = projectService.getProjectById(analysisInputDto.projectId());
        var analysisInput = new AnalysisInput();
        analysisInput.project = project;
        analysisInput.version = analysisInputDto.version();
        analysisInput.commitHash = analysisInputDto.commitHash();
        analysisInput.entities = analysisInputDto.entities();
        analysisInput.graph = analysisInputDto.graph();
        analysisInput.persist();
        return AnalysisInput.toFullDto(analysisInput);
    }

    public Entities getAnalysisInputEntities(Long inputId) {
        AnalysisInput input = AnalysisInput.find("id", inputId).firstResult();
        return input.entities;
    }

    public Graph getAnalysisInputGraph(Long inputId) {
        AnalysisInput input = AnalysisInput.find("id", inputId).firstResult();
        return input.graph;
    }

    public Long deleteAnalysisInputById(Long id) {
        return AnalysisInput.delete("id", id);
    }
}
