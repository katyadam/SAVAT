package org.adamkattan.model.entities;

import java.util.List;

public class EntityField {

    private String fieldName;
    private String fieldFullName;
    private String fieldType;
    private List<EntityFieldAnnotation> fieldAnnotations;
    private Boolean fieldIsReference;
    private String fieldEntityRefName;
    private Boolean isCollection;

}
