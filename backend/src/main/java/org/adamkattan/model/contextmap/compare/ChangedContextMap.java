package org.adamkattan.model.contextmap.compare;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "changed_context_map")
public class ChangedContextMap extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "context_map_id")
    public ContextMapEntity contextMap;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "changed_links")
    public List<ChangedLink> changedLinks;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    public static ChangedContextMapDto toDto(ChangedContextMap changedEntity) {
        return new ChangedContextMapDto(
                changedEntity.id,
                changedEntity.changedLinks,
                changedEntity.createdAt
        );
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
