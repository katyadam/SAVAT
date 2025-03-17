package org.adamkattan.model.project;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.adamkattan.model.callgraph.CallGraphInput;
import org.adamkattan.model.callgraph.compare.CallGraphOutput;
import org.adamkattan.model.contextmap.ContextMapEntity;
import org.adamkattan.model.contextmap.output.ContextMapOutput;
import org.adamkattan.model.sdg.ServiceDependencyGraphEntity;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "project")
public class Project extends PanacheEntity {

    @NotBlank(message = "name is required")
    @Column(nullable = false, name = "name")
    public String name;

    @NotBlank(message = "owner is required")
    @Column(nullable = false, name = "owner")
    public String owner;

    @NotBlank(message = "repository is required")
    @Column(nullable = false, name = "repository")
    public String repository;

    @Column(nullable = true, name = "access_token")
    public String accessToken;

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

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Column(nullable = false, name = "context_map_outputs")
    public List<ContextMapOutput> contextMapOutputs;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    public static ProjectDto toDto(Project project) {
        return new ProjectDto(
                project.id,
                project.name,
                project.owner,
                project.repository,
                project.accessToken
        );
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
