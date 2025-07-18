"use client";

import { socket } from "@/lib/socketio/client";
import type { ChatMessage, ChatRoomId, ChatUser } from "@chat/shared";
import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

export function useSocketIoChat(roomId: ChatRoomId, user: ChatUser) {
  const ws = useRef<Socket | null>(null);
  const [members, setMembers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    ws.current = socket;

    const handleMessage = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleRoomUsers = (roomUsers: ChatUser[]) => {
      setMembers(roomUsers);
    };

    ws.current.emit("join-room", { roomId, user });

    ws.current.on("chat-message", handleMessage);
    ws.current.on("room-users", handleRoomUsers);

    return () => {
      ws.current?.emit("leave-room", { roomId });
      ws.current?.off("chat-message");
      ws.current?.off("room-users");
    };
  }, [roomId, user]);

  function sendMessage(text: string) {
    if (!ws.current) return;

    ws.current.emit("chat-message", {
      roomId,
      message: {
        text,
        user,
      },
    });
  }

  return {
    members,
    messages,
    sendMessage,
  };
}
