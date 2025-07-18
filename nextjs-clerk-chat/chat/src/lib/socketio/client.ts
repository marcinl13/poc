"use client";

import type { ChatMessage, ChatRoomId, ChatUser } from "@chat/shared";
import { type Socket, io } from "socket.io-client";

// Events sent from client to server
export interface ClientToServerEvents {
  "join-room": (payload: { roomId: ChatRoomId; user: ChatUser }) => void;
  "leave-room": (payload: { roomId: ChatRoomId }) => void;
  "chat-message": (payload: {
    roomId: ChatRoomId;
    message: ChatMessage;
  }) => void;
}

// Events received from server
export interface ServerToClientEvents {
  "chat-message": (msg: ChatMessage) => void;
  "room-users": (users: ChatUser[]) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_URL
);
