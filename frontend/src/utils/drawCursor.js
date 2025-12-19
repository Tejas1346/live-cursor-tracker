export const drawCursor = (ctx, x, y, username, color = "#3b82f6") => {
  ctx.save();

  // Draw cursor shadow
  // ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
  // ctx.shadowBlur = 3;
  // ctx.shadowOffsetX = 1;
  // ctx.shadowOffsetY = 1;

  // Draw cursor pointer
  ctx.beginPath();
  ctx.moveTo(x, y); // Tip
  ctx.lineTo(x, y + 14); // Left edge
  ctx.lineTo(x + 4, y + 11); // Middle notch
  ctx.lineTo(x + 7, y + 16); // Bottom right
  ctx.lineTo(x + 9, y + 14); // Right indent
  ctx.lineTo(x + 6, y + 9); // Top right notch
  ctx.lineTo(x + 12, y + 10); // Right side
  ctx.closePath();

  // Fill
  ctx.fillStyle = color;
  ctx.fill();

  // Border
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.shadowColor = "transparent";

  // Username text only (no background)
  if (username) {
    ctx.font = "12px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = color;
    ctx.textBaseline = "top";
    ctx.fillText(username, x + 2, y + 20); // More space below cursor
  }

  ctx.restore();
};
