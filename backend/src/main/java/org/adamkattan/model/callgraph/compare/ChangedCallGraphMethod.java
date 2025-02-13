package org.adamkattan.model.callgraph.compare;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.adamkattan.model.callgraph.CallGraphMethod;

import java.util.List;

public class ChangedCallGraphMethod extends CallGraphMethod {
    @JsonProperty("typeOfChange")
    private final TypeOfChange typeOfChange;

    @JsonCreator
    public ChangedCallGraphMethod(Long id, String name, String classPath, List<String> parameters, String returnType, String display, String flags, String bytecodeHash, String msName, String endpointURI, String httpMethod, boolean isInterserviceMethod, boolean isEntryPoint, String methodSignature, TypeOfChange typeOfChange) {
        super(id, name, classPath, parameters, returnType, display, flags, bytecodeHash, msName, endpointURI, httpMethod, isInterserviceMethod, isEntryPoint, methodSignature);
        this.typeOfChange = typeOfChange;
    }

    public ChangedCallGraphMethod(CallGraphMethod method, TypeOfChange typeOfChange) {
        super(method.id(), method.name(), method.classPath(), method.parameters(), method.returnType(),
                method.display(), method.flags(), method.bytecodeHash(), method.msName(),
                method.endpointURI(), method.httpMethod(), method.isInterserviceMethod(),
                method.isEntryPoint(), method.methodSignature());
        this.typeOfChange = typeOfChange;
    }

    public TypeOfChange typeOfChange() {
        return typeOfChange;
    }

    @Override
    public String toString() {
        return super.toString() + ", typeOfChange=" + typeOfChange + "]";
    }
}
