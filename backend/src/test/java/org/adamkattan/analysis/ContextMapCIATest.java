package org.adamkattan.analysis;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.test.junit.QuarkusTest;
import org.adamkattan.model.contextmap.ContextMap;
import org.adamkattan.model.contextmap.output.CIAContextMap;
import org.adamkattan.model.contextmap.output.ChangedNode;
import org.adamkattan.model.contextmap.output.TypeOfChange;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@QuarkusTest
public class ContextMapCIATest {

    private ContextMap loadContextMapFromFile(String fileName) throws Exception {
        try (InputStream is = getClass().getClassLoader().getResourceAsStream(fileName)) {
            if (is != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.readValue(is, ContextMap.class);
            } else {
                throw new IllegalStateException("File " + fileName + " not found in resources");
            }
        }
    }

    private List<ChangedNode> getNodesByChange(List<ChangedNode> nodes, TypeOfChange typeOfChange) {
        return nodes.stream()
                .filter(node -> node.typeOfChange().equals(typeOfChange))
                .toList();
    }

    @Test
    void CIA_sameContextMaps_shouldReturnEmptyCM() throws Exception {
        ContextMap srcContextMap = loadContextMapFromFile("contextmaps/1.0.0.json");
        ContextMap targetContextMap = loadContextMapFromFile("contextmaps/1.0.0.json");

        CIAContextMap ciaContextMap = ContextMapChangeImpactAnalysis.changeImpactAnalysis(srcContextMap, targetContextMap);
        assertNotNull(ciaContextMap);
        assertEquals(0, ciaContextMap.nodes().size());
        assertEquals(0, ciaContextMap.links().size());
    }

    @Test
    void CIA_shouldReturnChangedCM() throws Exception {
        ContextMap srcContextMap = loadContextMapFromFile("contextmaps/1.0.0.json");
        ContextMap targetContextMap = loadContextMapFromFile("contextmaps/1.0.1.json");

        CIAContextMap ciaContextMap = ContextMapChangeImpactAnalysis.changeImpactAnalysis(srcContextMap, targetContextMap);
        assertNotNull(ciaContextMap);
        assertEquals(2, ciaContextMap.nodes().size());
        assertEquals(2, getNodesByChange(ciaContextMap.nodes(), TypeOfChange.MODIFIED).size());
        assertEquals(1, ciaContextMap.links().size());
    }

    @Test
    void CIA_addedNode_shouldReturnChangedCM() throws Exception {
        ContextMap srcContextMap = loadContextMapFromFile("contextmaps/1.0.1.json");
        ContextMap targetContextMap = loadContextMapFromFile("contextmaps/1.0.2.json");

        CIAContextMap ciaContextMap = ContextMapChangeImpactAnalysis.changeImpactAnalysis(srcContextMap, targetContextMap);
        assertNotNull(ciaContextMap);
        assertEquals(3, ciaContextMap.nodes().size());
        assertEquals(2, getNodesByChange(ciaContextMap.nodes(), TypeOfChange.NONE).size());
        assertEquals(1, getNodesByChange(ciaContextMap.nodes(), TypeOfChange.ADDED).size());
        assertEquals(2, ciaContextMap.links().size());
    }

    @Test
    void CIA_removedNode_shouldReturnChangedCM() throws Exception { // TODO: is this desired output ?
        ContextMap srcContextMap = loadContextMapFromFile("contextmaps/1.0.2.json");
        ContextMap targetContextMap = loadContextMapFromFile("contextmaps/1.0.3.json");

        CIAContextMap ciaContextMap = ContextMapChangeImpactAnalysis.changeImpactAnalysis(srcContextMap, targetContextMap);
        assertNotNull(ciaContextMap);
        assertEquals(1, ciaContextMap.nodes().size());
        assertEquals(1, getNodesByChange(ciaContextMap.nodes(), TypeOfChange.REMOVED).size());
        assertEquals(0, ciaContextMap.links().size());
    }

    @Test
    void CIA_multipleModifications_shouldReturnChangedCM() throws Exception {
        ContextMap srcContextMap = loadContextMapFromFile("contextmaps/1.0.4.json");
        ContextMap targetContextMap = loadContextMapFromFile("contextmaps/1.0.5.json");

        CIAContextMap ciaContextMap = ContextMapChangeImpactAnalysis.changeImpactAnalysis(srcContextMap, targetContextMap);
        assertNotNull(ciaContextMap);
        assertEquals(4, ciaContextMap.nodes().size());
        assertEquals(1, getNodesByChange(ciaContextMap.nodes(), TypeOfChange.REMOVED).size());
        assertEquals(1, getNodesByChange(ciaContextMap.nodes(), TypeOfChange.MODIFIED).size());
        assertEquals(2, getNodesByChange(ciaContextMap.nodes(), TypeOfChange.NONE).size());
        assertEquals(2, ciaContextMap.links().size());
    }

}
