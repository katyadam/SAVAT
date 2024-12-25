package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.GraphDifferenceAnalysis;
import org.adamkattan.model.graph.GraphLinksInputDto;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.output.ChangedGraphLinksOutput;

@ApplicationScoped
public class GraphDifferenceService {

    @Inject
    AnalysisInputService analysisInputService;

    public ChangedGraphLinksOutput getChangedGraphLinks(
            GraphLinksInputDto graphLinksInputDto,
            Long srcId
    ) {
        AnalysisInput analysisInput = analysisInputService.getAnalysisInputById(srcId);
        return GraphDifferenceAnalysis.getLinksDifference(
                analysisInput.graph.links(),
                graphLinksInputDto.links()
        );
    }

}
