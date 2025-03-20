package org.adamkattan.model.contextmap;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class Node implements Serializable {
    @JsonProperty("msName")
    private final String msName;
    @JsonProperty("nodeName")
    private final String nodeName;
    @JsonProperty("nodeFullName")
    private final String nodeFullName;
    @JsonProperty("fields")
    private final List<Field> fields;

    public Node(
            @JsonProperty("msName") String msName,
            @JsonProperty("nodeName") String nodeName,
            @JsonProperty("nodeFullName") String nodeFullName,
            @JsonProperty("fields") List<Field> fields
    ) {
        this.msName = msName;
        this.nodeName = nodeName;
        this.nodeFullName = nodeFullName;
        this.fields = fields;
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

    /**
     * @param node - node for comparison
     * @return true - if nodes are same, but don't have same fields, otherwise false
     */
    public boolean compare(Node node) {
        if (Objects.equals(this.msName, node.msName) &&
                Objects.equals(this.nodeName, node.nodeName) &&
                Objects.equals(this.nodeFullName, node.nodeFullName)) {
            // Nodes are same
            Map<FieldKey, Field> fieldMap = getFieldMap();
            return node.fields.stream().allMatch(otherField -> {
                Field field = fieldMap.get(new FieldKey(otherField.fieldType(), otherField.fieldName()));
                return field != null && field.compare(otherField);
            });
        }
        return false;
    }

    private Map<FieldKey, Field> getFieldMap() {
        return this.fields.stream()
                .collect(Collectors.toMap(
                        field -> new FieldKey(field.fieldType(), field.fieldName()),
                        field -> field
                ));
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (Node) obj;
        return Objects.equals(this.msName, that.msName) &&
                Objects.equals(this.nodeName, that.nodeName) &&
                Objects.equals(this.nodeFullName, that.nodeFullName) &&
                Objects.equals(this.fields, that.fields);
    }

    @Override
    public int hashCode() {
        return Objects.hash(msName, nodeName, nodeFullName, fields);
    }

    @Override
    public String toString() {
        return "Node[" +
                "msName=" + msName + ", " +
                "nodeName=" + nodeName + ", " +
                "nodeFullName=" + nodeFullName + ", " +
                "fields=" + fields + ']';
    }
}
