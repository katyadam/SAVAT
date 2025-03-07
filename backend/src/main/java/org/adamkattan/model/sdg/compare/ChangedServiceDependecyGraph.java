package org.adamkattan.model.sdg.compare;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.sdg.ServiceDependencyGraphEntity;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "changed_sdg")
public class ChangedServiceDependecyGraph extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "service_dependency_graph_id")
    public ServiceDependencyGraphEntity sdg;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "changed_links")
    public List<ChangedLink> changedLinks;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    public static ChangedServiceDependencyGraphDto toDto(ChangedServiceDependecyGraph changedGraph) {
        return new ChangedServiceDependencyGraphDto(
                changedGraph.id,
                changedGraph.changedLinks,
                changedGraph.createdAt
        );
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
