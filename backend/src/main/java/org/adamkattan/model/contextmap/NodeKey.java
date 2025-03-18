package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public record NodeKey(
        @JsonProperty("msName") String msName,
        @JsonProperty("nodeName") String nodeName
) {

    public NodeKey(Node node) {
        this(node.msName(), node.nodeName());
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        NodeKey nodeKey = (NodeKey) o;
        return Objects.equals(msName, nodeKey.msName) && Objects.equals(nodeName, nodeKey.nodeName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(msName, nodeName);
    }
}
