package org.adamkattan.model.sdg;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.adamkattan.model.project.Project;
import org.adamkattan.model.sdg.compare.ChangedServiceDependecyGraph;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "service_dependency_graph")
public class ServiceDependencyGraphEntity extends PanacheEntity {
    @ManyToOne
    @JoinColumn(name = "project_id")
    public Project project;

    @NotBlank(message = "version is required")
    @Column(nullable = false)
    public String version;

    @NotBlank(message = "commitHash is required")
    @Column(nullable = false, name = "commit_hash")
    public String commitHash;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "service_dependency_graph")
    public ServiceDependencyGraph sdg;

    @OneToMany(mappedBy = "sdg", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Column(nullable = false, name = "changed_service_dependency_graphs")
    public List<ChangedServiceDependecyGraph> changedSdgs;

    public static ServiceDependencyGraphFullDto toFullDto(ServiceDependencyGraphEntity input) {
        return new ServiceDependencyGraphFullDto(
                input.project.id,
                input.version,
                input.commitHash,
                input.sdg,
                input.changedSdgs
        );
    }

    public static ServiceDependencyGraphDto toDto(ServiceDependencyGraphEntity input) {
        return new ServiceDependencyGraphDto(
                input.id,
                input.project.id,
                input.version,
                input.commitHash,
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
