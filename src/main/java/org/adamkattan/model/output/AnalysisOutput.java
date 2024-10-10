package org.adamkattan.model.output;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "analysis_output")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisOutput extends PanacheEntity {

    @NotBlank(message = "appName is required")
    @Column(nullable = false, name = "app_name")
    public String appName;

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
