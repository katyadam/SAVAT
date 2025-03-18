package org.adamkattan.model.contextmap;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.adamkattan.model.contextmap.linkdiff.ChangedContextMap;
import org.adamkattan.model.project.Project;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "context_map")
public class ContextMapEntity extends PanacheEntity {

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
    @Column(nullable = false, columnDefinition = "jsonb", name = "context_map")
    public ContextMap contextMap;

    @OneToMany(mappedBy = "contextMap", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Column(nullable = false, name = "changed_context_maps")
    public List<ChangedContextMap> changedContextMaps;

    public static ContextMapFullDto toFullDto(ContextMapEntity input) {
        return new ContextMapFullDto(
                input.project.id,
                input.version,
                input.commitHash,
                input.contextMap,
                input.changedContextMaps
        );
    }

    public static ContextMapDto toDto(ContextMapEntity input) {
        return new ContextMapDto(
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
