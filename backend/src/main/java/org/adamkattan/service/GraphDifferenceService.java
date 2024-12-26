package org.adamkattan.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.adamkattan.analysis.GraphDifferenceAnalysis;
import org.adamkattan.model.graph.GraphLinksInputDto;
import org.adamkattan.model.graph.compare.ChangedGraph;
import org.adamkattan.model.graph.compare.ChangedGraphLinksOutput;
import org.adamkattan.model.input.AnalysisInput;

import java.util.List;

@ApplicationScoped
public class GraphDifferenceService {

    @Inject
    AnalysisInputService analysisInputService;

    public ChangedGraph getChangedGraph(Long id) {
        return ChangedGraph.find("id", id).firstResult();
    }

    public List<ChangedGraph> getChangedGraphs(Long analysisInputId) {
        return ChangedGraph.find("analysisInput.id", analysisInputId).list();
    }

    public ChangedGraphLinksOutput saveChangedGraphLinks(
            GraphLinksInputDto graphLinksInputDto,
            Long srcId
    ) {
        AnalysisInput analysisInput = analysisInputService.getAnalysisInputById(srcId);
        ChangedGraphLinksOutput linksDifference = GraphDifferenceAnalysis.getLinksDifference(
                analysisInput.graph.links(),
                graphLinksInputDto.links()
        );
        var changedGraph = new ChangedGraph();
        changedGraph.changedLinks = linksDifference.changedLinks();
        changedGraph.analysisInput = analysisInput;
        changedGraph.persist();
        return linksDifference;
    }

}
