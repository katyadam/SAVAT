package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.project.Project;

import java.util.List;

@ApplicationScoped
public class AnalysisInputService {

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
}
