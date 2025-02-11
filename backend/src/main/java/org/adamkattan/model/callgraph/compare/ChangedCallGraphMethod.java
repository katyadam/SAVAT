package org.adamkattan.model.callgraph.compare;

import org.adamkattan.model.callgraph.CallGraphMethod;

public record ChangedCallGraphMethod(
        CallGraphMethod method,
        TypeOfChange typeOfChange
) {
}
