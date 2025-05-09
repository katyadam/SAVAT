package org.adamkattan.analysis;

import jakarta.enterprise.context.ApplicationScoped;
import org.adamkattan.model.sdg.Link;
import org.adamkattan.model.sdg.compare.ChangedLink;
import org.adamkattan.model.sdg.compare.ChangedLinkType;
import org.adamkattan.model.sdg.compare.ChangedLinksOutput;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class SdgLinksDifferenceAnalysis {

    private record LinkKey(String source, String target) {
    }

    public static ChangedLinksOutput getLinksDifference(List<Link> src, List<Link> dest) {
        Map<LinkKey, Link> srcMap = transformToMap(src);
        Map<LinkKey, Link> destMap = transformToMap(dest);
        List<ChangedLink> changedLinks = new ArrayList<>();
        for (Link link : src) {
            var key = new LinkKey(
                    link.source(),
                    link.target()
            );
            if (!destMap.containsKey(key)) {
                changedLinks.add(new ChangedLink(link, ChangedLinkType.REMOVED));
                continue;
            }
            var destVal = destMap.get(key);
            if (!destVal.equals(link)) {
                changedLinks.add(new ChangedLink(destVal, ChangedLinkType.MODIFIED));
            }
        }
        for (Link link : dest) {
            var key = new LinkKey(
                    link.source(),
                    link.target()
            );
            if (!srcMap.containsKey(key)) {
                changedLinks.add(new ChangedLink(link, ChangedLinkType.ADDED));
                continue;
            }
            var srcVal = srcMap.get(key);
            if (srcVal.equals(link)) {
                changedLinks.add(new ChangedLink(link, ChangedLinkType.SAME));
            }
        }
        return new ChangedLinksOutput(changedLinks);
    }

    private static Map<LinkKey, Link> transformToMap(List<Link> links) {
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
