package org.adamkattan.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Entity
@Table(name = "analysis_input")
public class AnalysisInput extends PanacheEntity {
    @NotBlank(message = "app_name is required")
    @Column(nullable = false, unique = true)
    public String appName;

    @NotBlank(message = "version is required")
    @Column(nullable = false, unique = true)
    public String version;

    @NotBlank(message = "resultJson is required")
    @Column(nullable = false)
    public Object resultJson;

    @Column(nullable = false)
    public LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}