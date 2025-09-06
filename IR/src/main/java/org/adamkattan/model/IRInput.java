package org.adamkattan.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
@Table(name = "IR_input")
public class IRInput extends PanacheEntity {

    @NotBlank(message = "name is required")
    @Column(nullable = false, name = "name")
    public String name;

    @NotBlank(message = "commitHash is required")
    @Column(nullable = false, name = "commit_hash")
    public String commitHash;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb", name = "microservices")
    public List<Microservice> microservices;
}
