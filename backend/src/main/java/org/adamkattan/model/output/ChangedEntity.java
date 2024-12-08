package org.adamkattan.model.output;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import org.adamkattan.model.entities.ChangedEntityLink;
import org.adamkattan.model.input.AnalysisInput;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "changed_entity")
public class ChangedEntity extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "analysis_input_id")
    public AnalysisInput analysisInput;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "changed_links")
    public List<ChangedEntityLink> changedLinks;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;


    public static ChangedEntityDto toDto(ChangedEntity changedEntity) {
        return new ChangedEntityDto(
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
