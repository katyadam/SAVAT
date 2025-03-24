package org.adamkattan.analysis;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.test.junit.QuarkusTest;
import org.adamkattan.model.callgraph.CallGraph;
import org.adamkattan.model.callgraph.CallGraphCall;
import org.adamkattan.model.callgraph.compare.ChangedCallGraph;
import org.adamkattan.model.callgraph.compare.ChangedCallGraphMethod;
import org.adamkattan.model.callgraph.compare.TypeOfChange;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@QuarkusTest
public class CallGraphCIATest {

    private CallGraph loadCallGraphFromFile(String fileName) throws Exception {
        try (InputStream is = getClass().getClassLoader().getResourceAsStream(fileName)) {
            if (is != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.readValue(is, CallGraph.class);
            } else {
                throw new IllegalStateException("File " + fileName + " not found in resources");
            }
        }
    }

    private List<ChangedCallGraphMethod> getMethodsByChange(List<ChangedCallGraphMethod> methods, TypeOfChange typeOfChange) {
        return methods.stream()
                .filter(method -> method.typeOfChange().equals(typeOfChange))
                .toList();
    }

    @Test
    void CIA_sameCallGraphs_shouldReturnEmptyCG() throws Exception {
        CallGraph srcCallGraph = loadCallGraphFromFile("callgraphs/1.0.0.json");
        CallGraph targetCallGraph = loadCallGraphFromFile("callgraphs/1.0.0.json");

        ChangedCallGraph changedCallGraph = CallGraphChangeImpactAnalysis.changeImpactAnalysis(srcCallGraph, targetCallGraph);
        assertNotNull(changedCallGraph);
        assertEquals(0, changedCallGraph.methods().size());
        assertEquals(0, changedCallGraph.calls().size());
    }

    @Test
    void CIA_shouldReturnChangedCG() throws Exception {
        CallGraph srcCallGraph = loadCallGraphFromFile("callgraphs/1.0.0.json");
        CallGraph targetCallGraph = loadCallGraphFromFile("callgraphs/1.0.1.json");

        ChangedCallGraph changedCallGraph = CallGraphChangeImpactAnalysis.changeImpactAnalysis(srcCallGraph, targetCallGraph);
        assertNotNull(changedCallGraph);
        assertEquals(2, changedCallGraph.methods().size());
        assertEquals(1, getMethodsByChange(changedCallGraph.methods(), TypeOfChange.MODIFIED).size());
        assertEquals(1, getMethodsByChange(changedCallGraph.methods(), TypeOfChange.NONE).size());
        assertEquals(1, changedCallGraph.calls().size());
    }

    @Test
    void CIA_addedMethod_shouldReturnChangedCG() throws Exception {
        CallGraph srcCallGraph = loadCallGraphFromFile("callgraphs/1.0.1.json");
        CallGraph targetCallGraph = loadCallGraphFromFile("callgraphs/1.0.2.json");

        ChangedCallGraph changedCallGraph = CallGraphChangeImpactAnalysis.changeImpactAnalysis(srcCallGraph, targetCallGraph);
        assertNotNull(changedCallGraph);
        assertEquals(2, changedCallGraph.methods().size());
        assertEquals(1, getMethodsByChange(changedCallGraph.methods(), TypeOfChange.ADDED).size());
        assertEquals(1, getMethodsByChange(changedCallGraph.methods(), TypeOfChange.NONE).size());
        assertEquals(1, changedCallGraph.calls().size());
        assertEquals(new CallGraphCall(
                "B/int package.controller.B.bar(String)",
                "C/double package.controller.C.baz(double)",
                true,
                "GET"
        ), changedCallGraph.calls().getFirst());
    }

    @Test
    void CIA_removedMethod_shouldReturnChangedCG() throws Exception {
        CallGraph srcCallGraph = loadCallGraphFromFile("callgraphs/1.0.2.json");
        CallGraph targetCallGraph = loadCallGraphFromFile("callgraphs/1.0.3.json");

        ChangedCallGraph changedCallGraph = CallGraphChangeImpactAnalysis.changeImpactAnalysis(srcCallGraph, targetCallGraph);
        assertNotNull(changedCallGraph);
        assertEquals(2, changedCallGraph.methods().size());
        assertEquals(1, getMethodsByChange(changedCallGraph.methods(), TypeOfChange.REMOVED).size());
        assertEquals(1, getMethodsByChange(changedCallGraph.methods(), TypeOfChange.MODIFIED).size());
        assertEquals(0, changedCallGraph.calls().size());
    }

    @Test
    void CIA_multipleModifications_shouldReturnChangedCG() throws Exception {
        CallGraph srcCallGraph = loadCallGraphFromFile("callgraphs/1.0.4.json");
        CallGraph targetCallGraph = loadCallGraphFromFile("callgraphs/1.0.5.json");

        ChangedCallGraph changedCallGraph = CallGraphChangeImpactAnalysis.changeImpactAnalysis(srcCallGraph, targetCallGraph);
        assertNotNull(changedCallGraph);
        assertEquals(3, changedCallGraph.methods().size());
        assertEquals(1, getMethodsByChange(changedCallGraph.methods(), TypeOfChange.NONE).size());
        assertEquals(2, getMethodsByChange(changedCallGraph.methods(), TypeOfChange.MODIFIED).size());
        assertEquals(2, changedCallGraph.calls().size());
    }
}
