import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { socket } from "@/lib/socket";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSocket } from "@/hooks/useSocket";

const UserNameModal = ({ open, onOpenChange }) => {
  const [username, setUsername] = useState("");
  
  const handleSubmit = () => {
    if (!username.trim()) return;
    socket.connect();

   
    socket.emit("set-user", {
      username: username,
      
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} modal>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Enter Username</DialogTitle>
        </DialogHeader>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
        />

        <Button onClick={handleSubmit} className="w-full">
          Join Canvas
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserNameModal;
