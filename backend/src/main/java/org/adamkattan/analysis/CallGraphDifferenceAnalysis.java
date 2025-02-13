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


public class CallGraphDifferenceAnalysis {

    public static ChangedCallGraph changeImpactAnalysis(CallGraph sourceCallGraph, CallGraph targetCallGraph) {
        Map<CallGraphMethodKey, CallGraphMethod> sourceMethodsMap = sourceCallGraph.getMethodsMap();

        Map<CallGraphMethodKey, ChangedCallGraphMethod> changedMethodsMap = getChangedMethodsMap(
                sourceMethodsMap, targetCallGraph.getMethodsMap()
        );

        Set<ChangedCallGraphMethod> dependencyGraphMethods = new HashSet<>();
        Set<CallGraphCall> dependencyGraphCalls = new HashSet<>();
        changedMethodsMap.forEach((key, value) -> {
            ChangedCallGraph dependencyGraph = MethodDependency.getDependencyGraph(sourceCallGraph, key, sourceMethodsMap);
            dependencyGraphMethods.addAll(dependencyGraph.methods());
            dependencyGraphCalls.addAll(dependencyGraph.calls());
        });

        List<ChangedCallGraphMethod> allMethods = new ArrayList<>(changedMethodsMap.values());
        allMethods.addAll(dependencyGraphMethods);

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
                        new ChangedCallGraphMethod(value, TypeOfChange.ADDED)
                );
            }
            String targetBytecodeHash = targetMethods.get(key).bytecodeHash();
            if (!targetBytecodeHash.equals(value.bytecodeHash())) {
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
                        new ChangedCallGraphMethod(value, TypeOfChange.REMOVED)
                );
            }
        });

        return changedMethods;
    }
}
