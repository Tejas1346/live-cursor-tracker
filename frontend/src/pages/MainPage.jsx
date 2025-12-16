import React, { useEffect, useRef, useState } from "react";
import { socket } from "../lib/socket";
import throttle from "../utils/throttle";
const MainPage = () => {
  const [xCord, setXCord] = useState(0);
  const [yCord, setYCord] = useState(0);
  const [normal, setNormal] = useState(0);
  const [throttled, setThrottled] = useState(0);

  const throttledMouseMove = useRef(
    throttle((e) => {
      setXCord(e.clientX);
      setYCord(e.clientY);
      setThrottled((prev) => prev + 1);
      socket.emit("mouse-move",{xCord,yCord});
    }, 100)
  ).current;

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  

  return (
    <div
      className="min-w-screen min-h-screen flex items-center justify-center"
      onMouseMove={(e) => {
        setNormal((prev) => prev + 1);
        throttledMouseMove(e);
      }}
    >
      <div className="flex-col">
        <p>X:{xCord}</p>
        <p>Y:{yCord}</p>
        <p>Throttled:{throttled}</p>
        <p>Normal:{normal}</p>
        
      </div>
    </div>
  );
};

export default MainPage;
