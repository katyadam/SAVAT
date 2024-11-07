package org.adamkattan.model.output;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.adamkattan.model.project.Project;

import java.time.LocalDateTime;

@Entity
@Table(name = "analysis_output")
public class AnalysisOutput extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "project_id")
    public Project project;

    @NotBlank(message = "Both versions are required")
    @Column(nullable = false, name = "new_version")
    public String newVersion;

    @NotBlank(message = "Both versions are required")
    @Column(nullable = false, name = "old_version")
    public String oldVersion;

    @NotBlank(message = "Both commit hashes are required")
    @Column(nullable = false, name = "new_commit_hash")
    public String newCommitHash;

    @NotBlank(message = "Both commit hashes are required")
    @Column(nullable = false, name = "old_commit_hash")
    public String oldCommitHash;

    @Column(nullable = false, name = "is_different")
    public Boolean isDifferent;

    @Column(nullable = false, name = "created_at")
    public LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
