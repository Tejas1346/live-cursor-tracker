import React, { useEffect, useRef, useState } from "react";
// import { socket } from "../lib/socket";
import { lerp } from "../utils/lerp.js";
import throttle from "../utils/throttle";
const MainPage = () => {
  const [xCord, setXCord] = useState(0);
  const [yCord, setYCord] = useState(0);
  const [normal, setNormal] = useState(0);
  const [throttled, setThrottled] = useState(0);
  const canvasRef = useRef(null);
  const currentPosRef = useRef({ x: 100, y: 100 });

  const throttledMouseMove = useRef(
    throttle((e) => {
      const rect = canvasRef.current.getBoundingClientRect();

      setXCord(e.clientX - rect.left);
      setYCord(e.clientY - rect.top);
      setThrottled((prev) => prev + 1);
      // socket.emit("mouse-move", { xCord, yCord });
    }, 50)
  ).current;

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connected");
  //   });

  //   return () => {
  //     socket.off("connect");
  //   };
  // }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    console.log(xCord, yCord);
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ball
      ctx.beginPath();
      currentPosRef.current.x = lerp(currentPosRef.current.x, xCord, 0.05);
      currentPosRef.current.y = lerp(currentPosRef.current.y, yCord, 0.05);
      ctx.arc(
        currentPosRef.current.x,
        currentPosRef.current.y,
        30,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "#ef4444";
      ctx.fill();
      ctx.strokeStyle = "#991b1b";
      ctx.lineWidth = 2;
      ctx.stroke();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [xCord, yCord]);

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseMove={throttledMouseMove}
        width={800}
        height={600}
        className="border border-gray-300 cursor-pointer"
      ></canvas>
      <div>
        {xCord}
        {yCord}
      </div>
    </>
  );
};

export default MainPage;
