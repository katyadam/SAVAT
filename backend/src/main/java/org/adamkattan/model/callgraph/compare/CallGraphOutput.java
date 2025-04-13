package org.adamkattan.model.callgraph.compare;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import org.adamkattan.model.callgraph.CallGraphInputSimpleDto;
import org.adamkattan.model.project.Project;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "call_graph_output")
public class CallGraphOutput extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "project_id")
    public Project project;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, name = "source_call_graph_input")
    public CallGraphInputSimpleDto sourceCallGraphInput;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, name = "target_call_graph_input")
    public CallGraphInputSimpleDto targetCallGraphInput;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "changed_call_graph")
    public ChangedCallGraph changedCallGraph;

    public static CallGraphOutputSimpleDto toSimpleDto(CallGraphOutput output) {
        return new CallGraphOutputSimpleDto(
                output.id,
                output.project.id,
                output.sourceCallGraphInput,
                output.targetCallGraphInput,
                output.createdAt
        );
    }

    public static CallGraphOutputFullDto toFullDto(CallGraphOutput output) {
        return new CallGraphOutputFullDto(
                output.id,
                output.project.id,
                output.sourceCallGraphInput,
                output.targetCallGraphInput,
                output.createdAt,
                output.changedCallGraph
        );
    }

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}