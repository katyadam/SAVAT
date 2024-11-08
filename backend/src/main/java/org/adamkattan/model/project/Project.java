package org.adamkattan.model.project;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.adamkattan.model.input.AnalysisInput;
import org.adamkattan.model.output.AnalysisOutput;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "project")
public class Project extends PanacheEntity {

    @NotBlank(message = "projectName is required")
    @Column(nullable = false, name = "project_name")
    public String projectName;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Column(nullable = false, name = "inputs")
    public List<AnalysisInput> inputs;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Column(nullable = false, name = "outputs")
    public List<AnalysisOutput> outputs;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
