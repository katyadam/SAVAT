package org.adamkattan.analysis;

import org.adamkattan.model.callgraph.CallGraphMethod;
import org.adamkattan.model.callgraph.CallGraphMethodKey;
import org.adamkattan.model.callgraph.compare.ChangedCallGraphMethod;
import org.adamkattan.model.callgraph.compare.TypeOfChange;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CallGraphDifferenceAnalysis {

    public static void getDifference() {

    }

    private static List<ChangedCallGraphMethod> computeChangedMethods(
            Map<CallGraphMethodKey, CallGraphMethod> sourceMethods,
            Map<CallGraphMethodKey, CallGraphMethod> targetMethods
    ) {
        List<ChangedCallGraphMethod> changedMethods = new ArrayList<>();

        sourceMethods.forEach((key, value) -> {
            if (!targetMethods.containsKey(key)) {
                changedMethods.add(new ChangedCallGraphMethod(value, TypeOfChange.ADDED));
            }
            String targetBytecodeHash = targetMethods.get(key).bytecodeHash();
            if (!targetBytecodeHash.equals(value.bytecodeHash())) {
                changedMethods.add(new ChangedCallGraphMethod(value, TypeOfChange.MODIFIED));
            }
        });

        targetMethods.forEach((key, value) -> {
            if (!sourceMethods.containsKey(key)) {
                changedMethods.add(new ChangedCallGraphMethod(value, TypeOfChange.REMOVED));
            }
        });

        return changedMethods;
    }
}
