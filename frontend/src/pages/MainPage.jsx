import React, { useEffect, useRef, useState } from "react";
import { socket } from "../lib/socket";
import { lerp } from "../utils/lerp.js";
import { drawCursor } from "../utils/drawCursor.js";
import throttle from "../utils/throttle";
import { useCursorTracking } from "../hooks/useCursorTracking.js";
import { useCanvas } from "../hooks/useCanvas.js";
import { useSocket } from "../hooks/useSocket.js";
import UserNameModal from "@/components/UserNameModal";
const MainPage = () => {
  const canvasRef = useRef();
  // const currentPosRef = useRef({ x: 100, y: 100 });
  const { cursors, mouseMove } = useSocket();
  const { position, throttledMouseMove } = useCursorTracking(
    canvasRef,
    mouseMove
  );
  const [isJoined, setIsJoined] = useState(true);

  useCanvas(canvasRef, cursors);

  useEffect(() => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    const handleResize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <UserNameModal open={isJoined} onOpenChange={setIsJoined} />
      <canvas
        ref={canvasRef}
        onMouseMove={throttledMouseMove}
        className="border border-gray-300 cursor-pointer "
      ></canvas>
      <div>
        {position.x}
        {position.y}
      </div>
    </>
  );
};

export default MainPage;
