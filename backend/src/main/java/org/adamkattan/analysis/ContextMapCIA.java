package org.adamkattan.analysis;

import org.adamkattan.model.contextmap.ContextMap;
import org.adamkattan.model.contextmap.Link;
import org.adamkattan.model.contextmap.Node;
import org.adamkattan.model.contextmap.NodeKey;
import org.adamkattan.model.contextmap.algorithms.NodeDependency;
import org.adamkattan.model.contextmap.output.CIAContextMap;
import org.adamkattan.model.contextmap.output.ChangedNode;
import org.adamkattan.model.contextmap.output.TypeOfChange;

import java.util.*;

public class ContextMapCIA {

    public static CIAContextMap changeImpactAnalysis(ContextMap sourceContextMap, ContextMap targetContextMap) {
        Map<NodeKey, Node> sourceNodesMap = sourceContextMap.getNodesMap();
        Map<NodeKey, Node> targetNodesMap = targetContextMap.getNodesMap();

        Map<NodeKey, ChangedNode> changedNodesMap = getChangedNodesMap(
                sourceNodesMap, targetNodesMap
        );

        Set<ChangedNode> dependencyGraphNodes = new HashSet<>();
        Set<Link> dependencyGraphLinks = new HashSet<>();
        changedNodesMap.forEach((key, value) -> {
            CIAContextMap dependencyGraph = NodeDependency.getDependencyGraph(targetContextMap, key, targetNodesMap);
            dependencyGraphNodes.addAll(dependencyGraph.nodes());
            dependencyGraphLinks.addAll(dependencyGraph.links());
        });

        List<ChangedNode> allNodes = new ArrayList<>(changedNodesMap.values());
        allNodes.addAll(
                dependencyGraphNodes.stream()
                        .filter(
                                node -> !changedNodesMap.containsKey(new NodeKey(node))
                        ).toList()
        );
        return new CIAContextMap(
                allNodes,
                new ArrayList<>(dependencyGraphLinks)
        );
    }

    private static Map<NodeKey, ChangedNode> getChangedNodesMap(
            Map<NodeKey, Node> sourceNodes,
            Map<NodeKey, Node> targetNodes
    ) {
        Map<NodeKey, ChangedNode> changedNodes = new HashMap<>();

        sourceNodes.forEach((key, value) -> {
            if (!targetNodes.containsKey(key)) {
                changedNodes.put(
                        new NodeKey(value.msName(), value.nodeName()),
                        new ChangedNode(value, TypeOfChange.REMOVED)
                );
            }
            Node node = targetNodes.get(key);
            if (node != null && !node.compare(value)) {
                changedNodes.put(
                        new NodeKey(value.msName(), value.nodeName()),
                        new ChangedNode(value, TypeOfChange.MODIFIED)
                );
            }
        });

        targetNodes.forEach((key, value) -> {
            if (!sourceNodes.containsKey(key)) {
                changedNodes.put(
                        new NodeKey(value.msName(), value.nodeName()),
                        new ChangedNode(value, TypeOfChange.ADDED)
                );
            }
        });

        return changedNodes;
    }

}
