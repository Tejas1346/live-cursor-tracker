import { useEffect, useRef } from "react";
import { lerp } from "../utils/lerp";
import { drawCursor } from "../utils/drawCursor";

export const useCanvas = (canvasRef, cursors) => {
  const cursorsRef = useRef({});

  //TODO optimise the animate clears the canvas and reanimates every cursor shift
  useEffect(() => {
    for (const [userId, cursor] of Object.entries(cursors)) {
      if (!cursorsRef.current[userId]) {
        cursorsRef.current[userId] = { x: cursor.x, y: cursor.y };
      }
    }

    for (const [userId, cursor] of Object.entries(cursorsRef.current)) {
      if (!cursors[userId]) {
        delete cursorsRef.current[userId];
      }
    }
  }, [cursors]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    let animationId;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // // Draw ball
      // ctx.beginPath();
      // currentPosRef.current.x = lerp(currentPosRef.current.x, xCord, 0.1);
      // currentPosRef.current.y = lerp(currentPosRef.current.y, yCord, 0.1);
      // ctx.arc(
      //   currentPosRef.current.x,
      //   currentPosRef.current.y,
      //   30,
      //   0,
      //   2 * Math.PI
      // );
      // ctx.fillStyle = "#ef4444";
      // ctx.fill();
      // ctx.strokeStyle = "#991b1b";
      // ctx.lineWidth = 2;
      // ctx.stroke();

      for (const [userId, cursor] of Object.entries(cursors)) {
        //Not a user yet
        if (!cursorsRef.current[userId]) {
          cursorsRef.current[userId] = { x: cursor.x, y: cursor.y };
        }
        cursorsRef.current[userId].x = lerp(
          cursorsRef.current[userId].x,
          cursor.x,
          0.1
        );
        cursorsRef.current[userId].y = lerp(
          cursorsRef.current[userId].y,
          cursor.y,
          0.1
        );
        drawCursor(
          ctx,
          cursorsRef.current[userId].x,
          cursorsRef.current[userId].y,
          // cursor.x,
          // cursor.y,
          cursor.username,
          cursor.color
        );
        // console.log(userId);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [cursors]);

  return cursorsRef;
};
