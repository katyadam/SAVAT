package org.adamkattan.analysis;

import org.adamkattan.model.callgraph.CallGraph;
import org.adamkattan.model.callgraph.CallGraphCall;
import org.adamkattan.model.callgraph.CallGraphMethod;
import org.adamkattan.model.callgraph.CallGraphMethodKey;
import org.adamkattan.model.callgraph.algorithms.MethodDependency;
import org.adamkattan.model.callgraph.compare.ChangedCallGraph;
import org.adamkattan.model.callgraph.compare.ChangedCallGraphMethod;
import org.adamkattan.model.callgraph.compare.TypeOfChange;

import java.util.*;
import java.util.stream.Collectors;


public class CallGraphDifferenceAnalysis {

    public static ChangedCallGraph changeImpactAnalysis(CallGraph sourceCallGraph, CallGraph targetCallGraph) {
        Map<CallGraphMethodKey, CallGraphMethod> sourceMethodsMap = sourceCallGraph.getMethodsMap();
        Map<CallGraphMethodKey, CallGraphMethod> targetMethodsMap = targetCallGraph.getMethodsMap();

        Map<CallGraphMethodKey, ChangedCallGraphMethod> changedMethodsMap = getChangedMethodsMap(
                sourceMethodsMap, targetMethodsMap
        );

        Set<ChangedCallGraphMethod> dependencyGraphMethods = new HashSet<>();
        Set<CallGraphCall> dependencyGraphCalls = new HashSet<>();
        changedMethodsMap.forEach((key, value) -> {
            ChangedCallGraph dependencyGraph = MethodDependency.getDependencyGraph(targetCallGraph, key, targetMethodsMap);
            dependencyGraphMethods.addAll(dependencyGraph.methods());
            dependencyGraphCalls.addAll(dependencyGraph.calls());
        });

        List<ChangedCallGraphMethod> allMethods = new ArrayList<>(changedMethodsMap.values());
        allMethods.addAll(
                dependencyGraphMethods.stream()
                        .filter(
                                method -> !changedMethodsMap.containsKey(new CallGraphMethodKey(method.methodSignature()))
                        ).toList()
        );
        return new ChangedCallGraph(
                allMethods,
                new ArrayList<>(dependencyGraphCalls)
        );
    }

    private static Map<CallGraphMethodKey, ChangedCallGraphMethod> getChangedMethodsMap(
            Map<CallGraphMethodKey, CallGraphMethod> sourceMethods,
            Map<CallGraphMethodKey, CallGraphMethod> targetMethods
    ) {
        Map<CallGraphMethodKey, ChangedCallGraphMethod> changedMethods = new HashMap<>();

        sourceMethods.forEach((key, value) -> {
            if (!targetMethods.containsKey(key)) {
                changedMethods.put(
                        new CallGraphMethodKey(value.methodSignature()),
                        new ChangedCallGraphMethod(value, TypeOfChange.REMOVED)
                );
            }
            CallGraphMethod callGraphMethod = targetMethods.get(key);
            if (callGraphMethod != null && !callGraphMethod.bytecodeHash().equals(value.bytecodeHash())) {
                changedMethods.put(
                        new CallGraphMethodKey(value.methodSignature()),
                        new ChangedCallGraphMethod(value, TypeOfChange.MODIFIED)
                );
            }
        });

        targetMethods.forEach((key, value) -> {
            if (!sourceMethods.containsKey(key)) {
                changedMethods.put(
                        new CallGraphMethodKey(value.methodSignature()),
                        new ChangedCallGraphMethod(value, TypeOfChange.ADDED)
                );
            }
        });

        return changedMethods;
    }
}
