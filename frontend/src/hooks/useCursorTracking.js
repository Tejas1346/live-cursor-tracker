import { useRef, useState } from "react";
import throttle from "../utils/throttle";

export const useCursorTracking = (canvasRef, onMouseMove) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const throttledMouseMove = useRef(
    throttle((e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      setPosition({ newX, newY });
      onMouseMove(newX, newY);
      // socket.emit("mouse-move", { xCord, yCord });
    }, 50)
  ).current;

  return {position,throttledMouseMove}
};
