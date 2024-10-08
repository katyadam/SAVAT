package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;
import jakarta.ws.rs.BeanParam;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.input.AnalysisInputQuery;

import java.util.List;

@ApplicationScoped
public class AnalysisInputService {

    public List<AnalysisInput> getAppAnalysisInputs(@Valid @BeanParam AnalysisInputQuery query) {
        return AnalysisInput.find("appName", query.appName).list();
    }

    public AnalysisInput getAppLatestAnalysisInputByVersion(AnalysisInputQuery query) {
        return AnalysisInput
                .find("appName = ?1 ORDER BY string_to_array(version, '.') DESC", query.appName)
                .firstResult();
    }

    public AnalysisInput getAppLatestAnalysisInputByTimestamp(AnalysisInputQuery query) {
        return AnalysisInput
                .find("appName = ?1 ORDER BY createdAt DESC", query.appName)
                .firstResult();
    }
}
