import { FC, useEffect, useRef } from "react";
import { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import {
  ChangedLink,
  ContextMap,
  Link,
  Node,
  TypeOfChange,
} from "@/api/context-maps/types";
import { getCyInstance } from "./CytoscapeInstance";
import { getNodeSignature } from "@/api/context-maps/utils";

type EntityDetailsDiagramType = {
  graphData: ContextMap;
  showIsolatedNodes: boolean;
  msColors: Map<string, string>;
  onNodeClick: (node: Node) => void;
};

const EntityDetailsDiagram: FC<EntityDetailsDiagramType> = ({
  graphData,
  showIsolatedNodes,
  msColors,
  onNodeClick,
}) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  cytoscape.use(fcose);
  const formatNodeLabel = (node: Node) => {
    let label = `Entity: ${node.nodeName}`;

    let fieldLabel = "";
    let maxSize = 0;
    node.fields.forEach((field) => {
      fieldLabel += "\n" + field.fieldName + ": " + field.fieldType;
      if ((field.fieldName + ": " + field.fieldType).length > maxSize) {
        maxSize = (field.fieldName + ": " + field.fieldType).length;
      }
    });
    if (maxSize != 0) label += "\n" + "-".repeat(maxSize + 20);
    return label + fieldLabel;
  };

  const getNonIsolatedNodes = (nodes: Node[], links: Link[]) => {
    const linkedNodeNames = new Set<string>();

    links.forEach((link) => {
      linkedNodeNames.add(link.source);
      linkedNodeNames.add(link.target);
    });
    return nodes.filter((node) => linkedNodeNames.has(node.nodeName));
  };

  useEffect(() => {
    if (cyRef.current) {
      const visibleNodes = getNonIsolatedNodes(
        graphData.nodes,
        graphData.links
      );

      const elements: ElementsDefinition = {
        nodes: (showIsolatedNodes ? graphData.nodes : visibleNodes).map(
          (node: Node) => ({
            data: {
              id: getNodeSignature(node),
              label: formatNodeLabel(node),
              microservice: node.msName,
              typeOfChange:
                "typeOfChange" in node
                  ? (node.typeOfChange as TypeOfChange)
                  : TypeOfChange.NONE,
            },
            group: "nodes",
          })
        ),
        edges: graphData.links.map((link: Link | ChangedLink) => ({
          data: {
            source: getNodeSignature({
              msName: link.msSource,
              nodeName: link.source,
            }),
            target: getNodeSignature({
              msName: link.msTarget,
              nodeName: link.target,
            }),
            typeOfChange: "type" in link ? link.type.toString() : "SAME",
          },
          group: "edges",
        })),
      };

      const cyInstance = getCyInstance(
        cyRef,
        elements,
        msColors,
        "detailsGraph"
      );

      cyInstance.on("tap", "node", (event) => {
        const nodeData = event.target.data();
        const res = graphData.nodes.find(
          (node) => getNodeSignature(node) == nodeData.id
        );
        if (!res) {
          alert("This node doesn't exist!");
        } else {
          onNodeClick(res);
        }
      });

      return () => {
        cyInstance.destroy();
      };
    }
  }, [graphData, showIsolatedNodes]);

  return <div ref={cyRef} className="w-[90%] h-[90%]" />;
};

export default EntityDetailsDiagram;
