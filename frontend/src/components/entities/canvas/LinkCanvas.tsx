export const linkCanvasObject = (
  link: { source: { x: number; y: number }; target: { x: number; y: number } },
  ctx: CanvasRenderingContext2D,
  globalScale: number
) => {
  const { source, target } = link;

  const lineWidth = Math.max(2 / globalScale, 0.5);
  ctx.lineWidth = lineWidth;

  ctx.strokeStyle = "red"; // Color of the link

  const midX = source.x + (target.x - source.x) * 0.5 * globalScale;
  const midY = source.y + (target.y - source.y) * 0.5 * globalScale;
  // Drawing link
  ctx.beginPath();
  ctx.moveTo(source.x, source.y);
  ctx.lineTo(midX, midY);
  ctx.stroke();

  //   const arrowSize = 10 / globalScale;

  //   // Calculate the angle of the link
  //   const angle = Math.atan2(target.y - source.y, target.x - source.x);

  //   ctx.strokeStyle = "black";
  //   // Draw the arrowhead
  //   ctx.beginPath();
  //   ctx.moveTo(target.x, target.y);
  //   ctx.lineTo(
  //     target.x - arrowSize * Math.cos(angle - Math.PI / 6),
  //     target.y - arrowSize * Math.sin(angle - Math.PI / 6)
  //   );
  //   ctx.moveTo(target.x, target.y);
  //   ctx.lineTo(
  //     target.x - arrowSize * Math.cos(angle + Math.PI / 6),
  //     target.y - arrowSize * Math.sin(angle + Math.PI / 6)
  //   );
  //   ctx.stroke(); // Apply the arrowhead stroke
};
