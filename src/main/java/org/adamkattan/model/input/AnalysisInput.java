package org.adamkattan.model.input;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import org.adamkattan.model.entities.Entities;
import org.adamkattan.model.graph.Graph;
import org.adamkattan.model.methods.MicroserviceNode;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "analysis_input")
public class AnalysisInput extends PanacheEntity {
    @NotBlank(message = "appName is required")
    @Column(nullable = false, name = "app_name")
    public String appName;

    @NotBlank(message = "version is required")
    @Column(nullable = false)
    public String version;

    @NotBlank(message = "commitHash is required")
    @Column(nullable = false, name = "commit_hash")
    public String commitHash;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "entities")
    public Entities entities;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "graph")
    public Graph graph;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "methods")
    public List<MicroserviceNode> methods;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}