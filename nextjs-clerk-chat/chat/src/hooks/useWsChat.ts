"use client";

import { useEffect, useRef, useState } from "react";
import { connectToWebSocket, type Message, type ServerMessage, type User } from "@/lib/websocket/client";

export function useWsChat(roomId: string, user: User) {
  const ws = useRef<WebSocket | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    ws.current = connectToWebSocket();

    ws.current.onopen = () => {
      ws.current?.send(
        JSON.stringify({
          type: "join-room",
          payload: { roomId, user },
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data: ServerMessage = JSON.parse(event.data);

      switch (data.type) {
        case "room-joined":
          setMembers(data.payload.members);
          break;
        case "user-joined":
          setMembers((m) => [...m, data.payload.user]);
          break;
        case "user-left":
          setMembers((m) => m.filter((u) => u.id !== data.payload.user.id));
          break;
        case "message-received":
          setMessages((msgs) => [...msgs, data.payload.message]);
          break;
      }
    };

    return () => {
      ws.current?.send(
        JSON.stringify({
          type: "leave-room",
          payload: { roomId },
        })
      );
      ws.current?.close();
    };
  }, [roomId, user]);

  function sendMessage(text: string) {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    ws.current.send(
      JSON.stringify({
        type: "chat-message",
        payload: {
          roomId,
          message: { text, user },
        },
      })
    );
  }

  return {
    members,
    messages,
    sendMessage,
  };
}
