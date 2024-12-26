package org.adamkattan.analysis;

import org.adamkattan.model.graph.compare.ChangedGraphLink;
import org.adamkattan.model.graph.compare.ChangedGraphLinkType;
import org.adamkattan.model.graph.GraphLink;
import org.adamkattan.model.graph.compare.ChangedGraphLinksOutput;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GraphDifferenceAnalysis {

    private record LinkKey(String source, String target) {
    }

    public static ChangedGraphLinksOutput getLinksDifference(List<GraphLink> src, List<GraphLink> dest) {
        Map<LinkKey, GraphLink> srcMap = transformToMap(src);
        Map<LinkKey, GraphLink> destMap = transformToMap(dest);
        List<ChangedGraphLink> changedLinks = new ArrayList<>();
        for (GraphLink link : src) {
            var key = new LinkKey(
                    link.source(),
                    link.target()
            );
            if (!destMap.containsKey(key)) {
                changedLinks.add(new ChangedGraphLink(link, ChangedGraphLinkType.REMOVED));
                continue;
            }
            var destVal = destMap.get(key);
            if (!destVal.equals(link)) {
                changedLinks.add(new ChangedGraphLink(destVal, ChangedGraphLinkType.MODIFIED));
            }
        }
        for (GraphLink link : dest) {
            var key = new LinkKey(
                    link.source(),
                    link.target()
            );
            if (!srcMap.containsKey(key)) {
                changedLinks.add(new ChangedGraphLink(link, ChangedGraphLinkType.ADDED));
                continue;
            }
            var srcVal = srcMap.get(key);
            if (srcVal.equals(link)) {
                changedLinks.add(new ChangedGraphLink(link, ChangedGraphLinkType.SAME));
            }
        }
        return new ChangedGraphLinksOutput(changedLinks);
    }

    private static Map<LinkKey, GraphLink> transformToMap(List<GraphLink> links) {
        return links.stream()
                .collect(Collectors.toMap(
                        link -> new LinkKey(
                                link.source(),
                                link.target()
                        ),
                        link -> link
                ));
    }
}
