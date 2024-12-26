package org.adamkattan.analysis;

import org.adamkattan.model.methods.MicroserviceMethodNode;
import org.adamkattan.model.methods.MicroserviceNode;
import org.adamkattan.model.methods.compare.ChangedMethodsOutput;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MethodsDifferenceAnalysis {

    public static ChangedMethodsOutput computeChangedMethods(List<MicroserviceNode> src, List<MicroserviceNode> dest) {
        Map<String, MicroserviceNode> destMap = dest.stream()
                .collect(Collectors.toMap(MicroserviceNode::name, node -> node));

        List<MicroserviceNode> changedMs = new ArrayList<>();

        for (MicroserviceNode srcMs : src) {
            MicroserviceNode destMs = destMap.get(srcMs.name());

            if (destMs != null) {
                Map<String, String> destMethods = destMs.methods().stream()
                        .collect(Collectors.toMap(MicroserviceMethodNode::name, MicroserviceMethodNode::bytecodeHash));
                List<MicroserviceMethodNode> changedMethods = new ArrayList<>();
                for (MicroserviceMethodNode srcMethod : srcMs.methods()) {
                    String destBytecodeHash = destMethods.get(srcMethod.name());
                    if (destBytecodeHash != null && !destBytecodeHash.equals(srcMethod.bytecodeHash())) {
                        changedMethods.add(srcMethod);
                    }
                }
                if (!changedMethods.isEmpty()) {
                    changedMs.add(new MicroserviceNode(srcMs.name(), changedMethods));
                }
            }
        }

        return new ChangedMethodsOutput(changedMs);
    }
}
