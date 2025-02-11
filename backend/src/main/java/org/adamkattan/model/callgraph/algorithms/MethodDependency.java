package org.adamkattan.model.callgraph.algorithms;

import org.adamkattan.model.callgraph.CallGraph;
import org.adamkattan.model.callgraph.CallGraphCall;
import org.adamkattan.model.callgraph.CallGraphMethod;
import org.adamkattan.model.callgraph.CallGraphMethodKey;
import org.antlr.v4.runtime.misc.Pair;

import java.util.*;

public class MethodDependency {

    public static CallGraph getDependencyGraph(
            CallGraph callGraph,
            CallGraphMethodKey initialMethodKey,
            Map<CallGraphMethodKey, CallGraphMethod> methodsMap
    ) {
        Queue<CallGraphMethodKey> queue = new LinkedList<>();
        List<CallGraphMethod> collectedMethods = new ArrayList<>();
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
                    collectedMethods.add(methodsMap.get(adjacent));
                    collectedCalls.add(methodCall);
                }
            }
        }

        return new CallGraph(collectedMethods, collectedCalls);
    }
}
