"use client";

import { socket } from "@/lib/socketio/client";
import type { SocketUserProfile, SocketMessage, SocketUser } from "@/types";
import { useEffect, useState, FC } from "react";
import { ChatForm } from "./ChatForm";
import { ChatMessage } from "./ChatMessage";

type ChatProps = {
  roomId: string;
  userInfo: SocketUserProfile;
};

export const ChatRoom: FC<ChatProps> = ({ roomId, userInfo }) => {
  const [messages, setMessages] = useState<SocketMessage[]>([]);
  const [users, setUsers] = useState<SocketUser[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const handleMessage = (msg: SocketMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleRoomUsers = (roomUsers: SocketUser[]) => {
      setUsers(roomUsers);
    };

    socket.emit("join-room", { roomId, user: userInfo });

    socket.on("chat-message", handleMessage);
    socket.on("room-users", handleRoomUsers);

    return () => {
      socket.emit("leave-room", { roomId });
      socket.off("chat-message", handleMessage);
      socket.off("room-users", handleRoomUsers);
    };
  }, [roomId]);

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-4">
      <aside>
        <div className="mb-4">
          <h2 className="font-semibold">Users in Room:</h2>
          <ul>
            {users.map((u) => (
              <li key={u.id}>{u.user.email}</li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="w-full">
        <h1 className="text-2xl font-bold mb-4">Room: {roomId}</h1>

        <div className="mb-4">
          <h2 className="font-semibold">Messages:</h2>
          <div className="bg-gray-100 p-4 rounded h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
          </div>
        </div>

        <ChatForm
          userInfo={userInfo}
          handleOnMessageSend={(newMessage) => {
            socket.emit("chat-message", { roomId, message: newMessage });
          }}
        />
      </section>
    </div>
  );
};
