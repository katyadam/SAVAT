package org.adamkattan.analysis;

import org.adamkattan.model.entities.EntityLink;
import org.adamkattan.model.output.ChangedEntitiesLinksOutput;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class EntitiesDifferenceAnalysis {
    private record LinkKey(String source, String target, String msSource, String msTarget) {
    }

    public static ChangedEntitiesLinksOutput getLinksDifference(List<EntityLink> src, List<EntityLink> dest) {
        Map<LinkKey, EntityLink> destMap = transformToMap(dest);
        List<EntityLink> removedLinks = new ArrayList<>();
        List<EntityLink> modifiedLinks = new ArrayList<>();
        for (EntityLink link : src) {
            var key = new LinkKey(
                    link.source(),
                    link.target(),
                    link.msSource(),
                    link.msTarget()
            );
            if (!destMap.containsKey(key)) {
                removedLinks.add(link);
                continue;
            }
            if (!destMap.get(key).equals(link)) {
                modifiedLinks.add(link);
            }
        }
        return new ChangedEntitiesLinksOutput(removedLinks, modifiedLinks);
    }

    private static Map<LinkKey, EntityLink> transformToMap(List<EntityLink> links) {
        return links.stream()
                .collect(Collectors.toMap(
                        link -> new LinkKey(
                                link.source(),
                                link.target(),
                                link.msSource(),
                                link.msTarget()
                        ),
                        link -> link
                ));
    }

}
