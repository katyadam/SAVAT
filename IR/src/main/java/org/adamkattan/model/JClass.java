package org.adamkattan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.*;

/**
 * Represents a class in Java. It holds all information regarding that class including all method
 * declarations, method calls, fields, etc.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class JClass extends ProjectFile {

    private String packageName;
    private Set<String> implementedTypes;
    private ClassRole classRole;
    private Set<Method> methods;
    private Set<Field> fields;
    private Set<Annotation> annotations;
    private List<MethodCall> methodCalls;

    public JClass() {
        this.methods = new HashSet<>();
        this.fields = new HashSet<>();
        this.annotations = new HashSet<>();
        this.methodCalls = new ArrayList<>();
        this.implementedTypes = new HashSet<>();
        this.fileType = FileType.JCLASS;
    }

    public JClass(String name, String path, String packageName, ClassRole classRole) {
        super(name, path, FileType.JCLASS);
        this.packageName = packageName;
        this.classRole = classRole;
        this.methods = new HashSet<>();
        this.fields = new HashSet<>();
        this.annotations = new HashSet<>();
        this.methodCalls = new ArrayList<>();
        this.implementedTypes = new HashSet<>();
    }

    public JClass(String name, String path, String packageName, ClassRole classRole,
                  Set<Method> methods, Set<Field> fields, Set<Annotation> annotations,
                  List<MethodCall> methodCalls, Set<String> implementedTypes) {
        super(name, path, FileType.JCLASS);
        this.packageName = packageName;
        this.classRole = classRole;
        this.methods = methods;
        this.fields = fields;
        this.annotations = annotations;
        this.methodCalls = methodCalls;
        this.implementedTypes = implementedTypes;
    }

    @JsonProperty("packageName")
    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    @JsonProperty("implementedTypes")
    public Set<String> getImplementedTypes() {
        return implementedTypes;
    }

    public void setImplementedTypes(Set<String> implementedTypes) {
        this.implementedTypes = implementedTypes;
    }

    @JsonProperty("classRole")
    public ClassRole getClassRole() {
        return classRole;
    }

    public void setClassRole(ClassRole classRole) {
        this.classRole = classRole;
    }

    @JsonProperty("methods")
    public Set<Method> getMethods() {
        return methods;
    }

    public void setMethods(Set<Method> methods) {
        this.methods = methods;
    }

    @JsonProperty("fields")
    public Set<Field> getFields() {
        return fields;
    }

    public void setFields(Set<Field> fields) {
        this.fields = fields;
    }

    @JsonProperty("annotations")
    public Set<Annotation> getAnnotations() {
        return annotations;
    }

    public void setAnnotations(Set<Annotation> annotations) {
        this.annotations = annotations;
    }

    @JsonProperty("methodCalls")
    public List<MethodCall> getMethodCalls() {
        return methodCalls;
    }

    public void setMethodCalls(List<MethodCall> methodCalls) {
        this.methodCalls = methodCalls;
    }

//    public Set<Endpoint> getEndpoints() {
//        if ((!getClassRole().equals(ClassRole.CONTROLLER) && !getClassRole().equals(ClassRole.REP_REST_RSC))
//                || getMethods().isEmpty()) {
//            return new HashSet<>();
//        }
//        return methods.stream()
//                .filter(method -> method instanceof Endpoint)
//                .map(method -> (Endpoint) method)
//                .collect(Collectors.toUnmodifiableSet());
//    }
//
//    public List<RestCall> getRestCalls() {
//        return methodCalls.stream()
//                .filter(methodCall -> methodCall instanceof RestCall)
//                .map(methodCall -> (RestCall) methodCall)
//                .collect(Collectors.toUnmodifiableList());
//    }
//
//    public void updateMicroserviceName(String name) {
//        methodCalls.forEach(methodCall -> methodCall.setMicroserviceName(name));
//        methods.forEach(method -> method.setMicroserviceName(name));
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof JClass jClass)) return false;
        if (!super.equals(o)) return false;
        return Objects.equals(packageName, jClass.packageName) &&
                Objects.equals(implementedTypes, jClass.implementedTypes) &&
                classRole == jClass.classRole &&
                Objects.equals(methods, jClass.methods) &&
                Objects.equals(fields, jClass.fields) &&
                Objects.equals(annotations, jClass.annotations) &&
                Objects.equals(methodCalls, jClass.methodCalls);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), packageName, implementedTypes, classRole, methods, fields, annotations, methodCalls);
    }

    @Override
    public String toString() {
        return "JClass{" +
                "packageName='" + packageName + '\'' +
                ", implementedTypes=" + implementedTypes +
                ", classRole=" + classRole +
                ", methods=" + methods +
                ", fields=" + fields +
                ", annotations=" + annotations +
                ", methodCalls=" + methodCalls +
                "} " + super.toString();
    }
}
