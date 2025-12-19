import { useEffect, useState } from "react";
import { socket } from "../lib/socket";


export const useSocket = () => {
  const [cursors, setCursors] = useState({});

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("user-joined", ({ userId,username,color }) => {
      console.log("user-joined",username);
      

      setCursors((prev) => ({
        ...prev,
        [userId]: { x: 100, y: 100,username:username,color :color},
      }));
    //   cursorsRef.current[userId] = { x: 100, y: 100 };
    });

    socket.on("cursor-update", ({ userId, x, y,username,color }) => {
      
      console.log()
      setCursors((prev) => ({
        ...prev,
        [userId]: {x,y,username,color }
      }));

      // to sync in users who joined before this guy
    //   if (!cursorsRef.current[userId])
    //     cursorsRef.current[userId] = { x: 100, y: 100 };
    });

    socket.on("user-left", ({ userId }) => {
      setCursors((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });

    //   delete cursorsRef.current[userId];
    });

    return () => {
      socket.off("connect");
      socket.off("cursor-update");
      // socket.off("disconnect");
      socket.off("user-joined");
      socket.off("user-left");
    };
  }, []);

  const mouseMove = (x,y)=>{
    socket.emit("mouse-move",{
        x:x,
        y:y
    })
  }

  return {cursors,mouseMove};
};
