package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.adamkattan.model.input.AnalysisInput;

import java.util.List;

@ApplicationScoped
public class AnalysisInputService {

    public List<AnalysisInput> getAppAnalysisInputs(String appName) {
        return AnalysisInput.find("appName", appName).list();
    }

    public AnalysisInput getAppLatestAnalysisInputByVersion(String appName) {
        return AnalysisInput
                .find("appName = ?1 ORDER BY string_to_array(version, '.') DESC", appName)
                .firstResult();
    }

    public AnalysisInput getAppLatestAnalysisInputByTimestamp(String appName) {
        return AnalysisInput
                .find("appName = ?1 ORDER BY createdAt DESC", appName)
                .firstResult();
    }
}
