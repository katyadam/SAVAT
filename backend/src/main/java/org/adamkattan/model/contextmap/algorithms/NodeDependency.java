package org.adamkattan.model.contextmap.algorithms;

import org.adamkattan.model.contextmap.ContextMap;
import org.adamkattan.model.contextmap.Link;
import org.adamkattan.model.contextmap.Node;
import org.adamkattan.model.contextmap.NodeKey;
import org.adamkattan.model.contextmap.output.CIAContextMap;
import org.adamkattan.model.contextmap.output.ChangedNode;
import org.adamkattan.model.contextmap.output.TypeOfChange;

import java.util.*;

public class NodeDependency {

    public static CIAContextMap getDependencyGraph(
            ContextMap contextMap,
            NodeKey initialNodeKey,
            Map<NodeKey, Node> nodesMap
    ) {
        Queue<NodeKey> queue = new LinkedList<>();
        List<ChangedNode> collectedNodes = new ArrayList<>();
        List<Link> collectedLinks = new ArrayList<>();
        Set<NodeKey> visited = new HashSet<>();

        queue.add(new NodeKey(initialNodeKey.msName(), initialNodeKey.nodeName()));

        while (!queue.isEmpty()) {
            NodeKey current = queue.poll();
            for (var link : contextMap.getLinksByLinkedNode(current)) {
                var adjacent = new NodeKey(link.msSource(), link.source());
                var node = nodesMap.get(adjacent);
                if (!visited.contains(adjacent) && node != null) {
                    queue.add(adjacent);
                    visited.add(adjacent);
                    collectedNodes.add(new ChangedNode(node, TypeOfChange.NONE));
                    collectedLinks.add(link);
                }
            }
        }

        return new CIAContextMap(collectedNodes, collectedLinks);
    }

}
