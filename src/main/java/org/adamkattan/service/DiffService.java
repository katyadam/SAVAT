package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.PlainDifference;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.output.AnalysisOutput;

import java.util.Optional;

@ApplicationScoped
public class DiffService {

    @Inject
    AnalysisInputService analysisInputService;

    @Inject
    PlainDifference plainDifference;


    public Optional<AnalysisOutput> getPlainDifference(AnalysisInput newInput, AnalysisInput oldInput) {
        Optional<AnalysisOutput> result = plainDifference.getPlainDifference(newInput, oldInput);

        if (result.isPresent()) {
            var resultToPersist = result.get();

            if (!resultToPersist.isPersistent())
                resultToPersist.persist();
        }

        return result;
    }
}
