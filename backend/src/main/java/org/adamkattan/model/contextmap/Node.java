package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

public class Node implements Serializable {
    @JsonProperty("id")
    private final Long id;
    @JsonProperty("msName")
    private final String msName;
    @JsonProperty("nodeName")
    private final String nodeName;
    @JsonProperty("nodeFullName")
    private final String nodeFullName;
    @JsonProperty("fields")
    private final List<Field> fields;

    public Node(
            @JsonProperty("id") Long id,
            @JsonProperty("msName") String msName,
            @JsonProperty("nodeName") String nodeName,
            @JsonProperty("nodeFullName") String nodeFullName,
            @JsonProperty("fields") List<Field> fields
    ) {
        this.id = id;
        this.msName = msName;
        this.nodeName = nodeName;
        this.nodeFullName = nodeFullName;
        this.fields = fields;
    }

    @JsonProperty("id")
    public Long id() {
        return id;
    }

    @JsonProperty("msName")
    public String msName() {
        return msName;
    }

    @JsonProperty("nodeName")
    public String nodeName() {
        return nodeName;
    }

    @JsonProperty("nodeFullName")
    public String nodeFullName() {
        return nodeFullName;
    }

    @JsonProperty("fields")
    public List<Field> fields() {
        return fields;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (Node) obj;
        return Objects.equals(this.id, that.id) &&
                Objects.equals(this.msName, that.msName) &&
                Objects.equals(this.nodeName, that.nodeName) &&
                Objects.equals(this.nodeFullName, that.nodeFullName) &&
                Objects.equals(this.fields, that.fields);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, msName, nodeName, nodeFullName, fields);
    }

    @Override
    public String toString() {
        return "Node[" +
                "id=" + id + ", " +
                "msName=" + msName + ", " +
                "nodeName=" + nodeName + ", " +
                "nodeFullName=" + nodeFullName + ", " +
                "fields=" + fields + ']';
    }
}
