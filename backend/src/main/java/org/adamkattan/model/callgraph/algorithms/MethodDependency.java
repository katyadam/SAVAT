package org.adamkattan.model.callgraph.algorithms;

import org.adamkattan.model.callgraph.CallGraph;
import org.adamkattan.model.callgraph.CallGraphCall;
import org.adamkattan.model.callgraph.CallGraphMethod;
import org.adamkattan.model.callgraph.CallGraphMethodKey;
import org.adamkattan.model.callgraph.compare.ChangedCallGraph;
import org.adamkattan.model.callgraph.compare.ChangedCallGraphMethod;
import org.adamkattan.model.callgraph.compare.TypeOfChange;

import java.util.*;

public class MethodDependency {

    public static ChangedCallGraph getDependencyGraph(
            CallGraph callGraph,
            CallGraphMethodKey initialMethodKey,
            Map<CallGraphMethodKey, CallGraphMethod> methodsMap
    ) {
        Queue<CallGraphMethodKey> queue = new LinkedList<>();
        List<ChangedCallGraphMethod> collectedMethods = new ArrayList<>();
        List<CallGraphCall> collectedCalls = new ArrayList<>();
        Set<CallGraphMethodKey> visited = new HashSet<>();

        queue.add(new CallGraphMethodKey(initialMethodKey.methodSignature()));

        while (!queue.isEmpty()) {
            CallGraphMethodKey current = queue.poll();
            for (var methodCall : callGraph.getMethodCalledByCalls(current)) {
                var adjacent = new CallGraphMethodKey(methodCall.source());
                if (!visited.contains(adjacent)) {
                    queue.add(adjacent);
                    visited.add(adjacent);
                    collectedMethods.add(new ChangedCallGraphMethod(methodsMap.get(adjacent), TypeOfChange.NONE));
                    collectedCalls.add(methodCall);
                }
            }
        }

        return new ChangedCallGraph(collectedMethods, collectedCalls);
    }
}
