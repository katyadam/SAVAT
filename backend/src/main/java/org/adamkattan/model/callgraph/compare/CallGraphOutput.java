package org.adamkattan.model.callgraph.compare;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    public static CallGraphOutputSimpleDto toSimpleDto(CallGraphOutput input) {
        return new CallGraphOutputSimpleDto(
                input.id,
                input.project.id,
                input.sourceCallGraphInput,
                input.targetCallGraphInput,
                input.createdAt
        );
    }

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}