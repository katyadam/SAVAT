package org.adamkattan.model.graph.compare;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import org.adamkattan.model.input.AnalysisInput;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "changed_graph")
public class ChangedGraph extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "analysis_input_id")
    public AnalysisInput analysisInput;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "changed_links")
    public List<ChangedGraphLink> changedLinks;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    public static ChangedGraphDto toDto(ChangedGraph changedGraph) {
        return new ChangedGraphDto(
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
