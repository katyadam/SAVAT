package org.adamkattan.model.contextmap.output;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.contextmap.Field;
import org.adamkattan.model.contextmap.Node;

import java.util.List;

public class ChangedNode extends Node {
    @JsonProperty("typeOfChange")
    private final TypeOfChange typeOfChange;

    @JsonCreator
    public ChangedNode(Long id, String msName, String nodeName, String nodeFullName, List<Field> fields, TypeOfChange typeOfChange) {
        super(id, msName, nodeName, nodeFullName, fields);
        this.typeOfChange = typeOfChange;
    }

    public ChangedNode(Node node, TypeOfChange typeOfChange) {
        super(node.id(), node.msName(), node.nodeName(), node.nodeFullName(), node.fields());
        this.typeOfChange = typeOfChange;
    }

    public TypeOfChange typeOfChange() {
        return typeOfChange;
    }

    @Override
    public String toString() {
        return super.toString() + ", typeOfChange=" + typeOfChange + "]";
    }
}
