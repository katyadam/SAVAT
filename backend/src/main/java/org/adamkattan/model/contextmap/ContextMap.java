package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public record ContextMap(
        @JsonProperty("nodes") List<Node> nodes,
        @JsonProperty("links") List<Link> links
) implements Serializable {

    @JsonIgnore
    public Map<NodeKey, Node> getNodesMap() {
        return nodes.stream()
                .collect(Collectors.toMap(
                        NodeKey::new,
                        node -> node
                ));
    }

    @JsonIgnore
    public List<Link> getLinksByLinkedNode(NodeKey nodeKey) {
        return this.links.stream()
                .filter(link -> link.target().equals(nodeKey.nodeName()) &&
                        link.msTarget().equals(nodeKey.msName()))
                .toList();
    }

}
