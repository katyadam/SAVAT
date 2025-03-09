package org.adamkattan.model.callgraph;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.adamkattan.model.project.Project;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "call_graph_input")
public class CallGraphInput extends PanacheEntity {
    @ManyToOne
    @JoinColumn(name = "project_id")
    public Project project;

    @NotBlank(message = "version is required")
    @Column(nullable = false)
    public String version;

    @NotBlank(message = "commitHash is required")
    @Column(nullable = false, name = "commit_hash")
    public String commitHash;

    @NotBlank(message = "branch is required")
    @Column(nullable = false, name = "branch")
    public String branch;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "call_graph")
    public CallGraph callGraph;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    public static CallGraphInputDto toDto(CallGraphInput input) {
        return new CallGraphInputDto(
                input.project.id,
                input.version,
                input.commitHash,
                input.branch,
                input.callGraph
        );
    }

    public static CallGraphInputSimpleDto toSimpleDto(CallGraphInput input) {
        return new CallGraphInputSimpleDto(
                input.id,
                input.project.id,
                input.version,
                input.commitHash,
                input.branch,
                input.createdAt
        );
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
