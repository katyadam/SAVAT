package org.adamkattan.model.project;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.adamkattan.model.callgraph.CallGraphInput;
import org.adamkattan.model.callgraph.compare.CallGraphOutput;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.sdg.ServiceDependencyGraphEntity;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "project")
public class Project extends PanacheEntity {

    @NotBlank(message = "projectName is required")
    @Column(nullable = false, name = "project_name")
    public String projectName;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Column(nullable = false, name = "service_dependency_graphs")
    public List<ServiceDependencyGraphEntity> sdgs;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Column(nullable = false, name = "context_maps")
    public List<ContextMapEntity> contextMaps;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Column(nullable = false, name = "call_graph_inputs")
    public List<CallGraphInput> callGraphInputs;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Column(nullable = false, name = "call_graph_outputs")
    public List<CallGraphOutput> callGraphOutputs;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    public static ProjectDto toDto(Project project) {
        return new ProjectDto(
                project.id,
                project.projectName
        );
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
