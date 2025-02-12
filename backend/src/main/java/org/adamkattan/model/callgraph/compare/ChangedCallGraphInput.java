package org.adamkattan.model.callgraph.compare;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import org.adamkattan.model.callgraph.CallGraphInput;
import org.adamkattan.model.callgraph.CallGraphInputSimpleDto;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "changed_call_graph_input")
public class ChangedCallGraphInput extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "source_call_graph_input_id", nullable = false)
    public CallGraphInput sourceCallGraphInput;

    @ManyToOne
    @JoinColumn(name = "target_call_graph_input_id", nullable = false)
    public CallGraphInput targetCallGraphInput;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "changed_call_graph")
    public ChangedCallGraph changedCallGraph;

    public static ChangedCallGraphInputSimpleDto toSimpleDto(ChangedCallGraphInput input) {
        return new ChangedCallGraphInputSimpleDto(
                new CallGraphInputSimpleDto(input.sourceCallGraphInput),
                new CallGraphInputSimpleDto(input.targetCallGraphInput),
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