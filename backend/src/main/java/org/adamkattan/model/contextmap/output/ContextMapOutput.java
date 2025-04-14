package org.adamkattan.model.contextmap.output;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import org.adamkattan.model.contextmap.ContextMapDto;
import org.adamkattan.model.project.Project;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "context_map_output")
public class ContextMapOutput extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "project_id")
    public Project project;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, name = "source_context_map")
    public ContextMapDto sourceContextMap;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, name = "target_context_map")
    public ContextMapDto targetContextMap;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "changed_context_map")
    public CIAContextMap changedContextMap;

    public static ContextMapOutputDto toDto(ContextMapOutput output) {
        return new ContextMapOutputDto(
                output.id,
                output.project.id,
                output.sourceContextMap,
                output.targetContextMap,
                output.createdAt
        );
    }

    public static ContextMapOutputFullDto toFullDto(ContextMapOutput output) {
        return new ContextMapOutputFullDto(
                output.id,
                output.project.id,
                output.sourceContextMap,
                output.targetContextMap,
                output.createdAt,
                output.changedContextMap
        );
    }

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
