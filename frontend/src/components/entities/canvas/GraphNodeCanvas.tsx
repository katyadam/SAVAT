import { EntityNode } from "@/api/entities/types";

export const nodeCanvasObject = (
  node: EntityNode & { x: number; y: number },
  ctx: CanvasRenderingContext2D,
  globalScale: number
) => {
  const label = `Microservice: ${node.msName},Entity: ${node.nodeName},Entity - Full Name: ${node.nodeFullName}`;
  const fontSize = 14 / (globalScale * 1.2);
  ctx.font = `${fontSize}px Sans-Serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = fontSize * 1.2;
  const lines = label.split(",");
  let x = node.x;
  let y = node.y - lineHeight;

  // Calculate the width and height of the background
  const textWidth = Math.max(
    ...lines.map((line) => ctx.measureText(line).width)
  );
  const textHeight = lines.length * lineHeight;

  // Draw the background rectangle
  ctx.fillStyle = "black";
  ctx.fillRect(
    x - textWidth / 2 - 5,
    y - lineHeight,
    textWidth + 10,
    textHeight + 2
  );

  ctx.fillStyle = "white";
  for (let i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    y += lineHeight;
  }
};
