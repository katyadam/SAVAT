package org.adamkattan.model.callgraph;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Objects;

public class CallGraphMethod {
    @JsonProperty("id")
    private final Long id;
    @JsonProperty("name")
    private final String name;
    @JsonProperty("type")
    private final String classPath;
    @JsonProperty("parameters")
    private final List<String> parameters;
    @JsonProperty("returnType")
    private final String returnType;
    @JsonProperty("display")
    private final String display;
    @JsonProperty("flags")
    private final String flags;
    @JsonProperty("bytecodeHash")
    private final String bytecodeHash;
    @JsonProperty("microservice")
    private final String msName;
    @JsonProperty("endpointURI")
    private final String endpointURI;
    @JsonProperty("httpMethod")
    private final String httpMethod;
    @JsonProperty("endpointMethod")
    private final boolean isInterserviceMethod;
    @JsonProperty("entryPoint")
    private final boolean entryPoint;
    @JsonProperty("methodSignature")
    private final String methodSignature;

    public CallGraphMethod(
            @JsonProperty("id") Long id,
            @JsonProperty("name") String name,
            @JsonProperty("type") String classPath,
            @JsonProperty("parameters") List<String> parameters,
            @JsonProperty("returnType") String returnType,
            @JsonProperty("display") String display,
            @JsonProperty("flags") String flags,
            @JsonProperty("bytecodeHash") String bytecodeHash,
            @JsonProperty("microservice") String msName,
            @JsonProperty("endpointURI") String endpointURI,
            @JsonProperty("httpMethod") String httpMethod,
            @JsonProperty("endpointMethod") boolean isInterserviceMethod,
            @JsonProperty("entryPoint") boolean entryPoint,
            @JsonProperty("methodSignature") String methodSignature
    ) {
        this.id = id;
        this.name = name;
        this.classPath = classPath;
        this.parameters = parameters;
        this.returnType = returnType;
        this.display = display;
        this.flags = flags;
        this.bytecodeHash = bytecodeHash;
        this.msName = msName;
        this.endpointURI = endpointURI;
        this.httpMethod = httpMethod;
        this.isInterserviceMethod = isInterserviceMethod;
        this.entryPoint = entryPoint;
        this.methodSignature = methodSignature;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CallGraphMethod that = (CallGraphMethod) o;
        return Objects.equals(bytecodeHash, that.bytecodeHash) && Objects.equals(methodSignature, that.methodSignature);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bytecodeHash, methodSignature);
    }

    @JsonProperty("id")
    public Long id() {
        return id;
    }

    @JsonProperty("name")
    public String name() {
        return name;
    }

    @JsonProperty("type")
    public String classPath() {
        return classPath;
    }

    @JsonProperty("parameters")
    public List<String> parameters() {
        return parameters;
    }

    @JsonProperty("returnType")
    public String returnType() {
        return returnType;
    }

    @JsonProperty("display")
    public String display() {
        return display;
    }

    @JsonProperty("flags")
    public String flags() {
        return flags;
    }

    @JsonProperty("bytecodeHash")
    public String bytecodeHash() {
        return bytecodeHash;
    }

    @JsonProperty("microservice")
    public String msName() {
        return msName;
    }

    @JsonProperty("endpointURI")
    public String endpointURI() {
        return endpointURI;
    }

    @JsonProperty("httpMethod")
    public String httpMethod() {
        return httpMethod;
    }

    @JsonProperty("endpointMethod")
    public boolean isInterserviceMethod() {
        return isInterserviceMethod;
    }

    @JsonProperty("entryPoint")
    public boolean entryPoint() {
        return entryPoint;
    }

    @JsonProperty("methodSignature")
    public String methodSignature() {
        return methodSignature;
    }

    @Override
    public String toString() {
        return "CallGraphMethod[" +
                "id=" + id + ", " +
                "name=" + name + ", " +
                "classPath=" + classPath + ", " +
                "parameters=" + parameters + ", " +
                "returnType=" + returnType + ", " +
                "display=" + display + ", " +
                "flags=" + flags + ", " +
                "bytecodeHash=" + bytecodeHash + ", " +
                "msName=" + msName + ", " +
                "endpointURI=" + endpointURI + ", " +
                "httpMethod=" + httpMethod + ", " +
                "isInterserviceMethod=" + isInterserviceMethod + ", " +
                "entryPoint=" + entryPoint + ", " +
                "methodSignature=" + methodSignature + ']';
    }

}
