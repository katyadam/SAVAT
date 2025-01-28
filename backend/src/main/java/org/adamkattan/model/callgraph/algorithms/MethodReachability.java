package org.adamkattan.model.callgraph.algorithms;

import org.adamkattan.model.callgraph.CallGraph;
import org.adamkattan.model.callgraph.CallGraphCall;
import org.adamkattan.model.callgraph.CallGraphMethod;
import org.adamkattan.model.callgraph.CallGraphMethodKey;

import java.util.*;

public class MethodReachability {

    public static CallGraph compute(CallGraph callGraph, CallGraphMethodKey initialMethodKey) {
        Map<CallGraphMethodKey, CallGraphMethod> methodsMap = callGraph.getMethodsMap();
        Queue<CallGraphMethodKey> queue = new LinkedList<>();
        List<CallGraphMethod> collectedMethods = new ArrayList<>();
        List<CallGraphCall> collectedCalls = new ArrayList<>();
        Set<CallGraphMethodKey> visited = new HashSet<>();

        queue.add(new CallGraphMethodKey(initialMethodKey.methodSignature()));

        while (!queue.isEmpty()) {
            CallGraphMethodKey current = queue.poll();
            collectedMethods.add(methodsMap.get(current));
            for (var methodCall : callGraph.getMethodCalls(current)) {
                var adjacent = new CallGraphMethodKey(methodCall.target());
                if (!visited.contains(adjacent)) {
                    queue.add(adjacent);
                    visited.add(adjacent);
                    collectedCalls.add(methodCall);
                }
            }
        }

        return new CallGraph(collectedMethods, collectedCalls);
    }

}
