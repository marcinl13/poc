"use client";

import type { SocketUserProfile, SocketMessage, SocketUser } from "@/types";
import { io, Socket } from "socket.io-client";

// Events sent from client to server
export interface ClientToServerEvents {
  "join-room": (payload: { roomId: string; user: SocketUserProfile }) => void;
  "leave-room": (payload: { roomId: string }) => void;
  "chat-message": (payload: { roomId: string; message: SocketMessage }) => void;
}

// Events received from server
export interface ServerToClientEvents {
  "chat-message": (msg: SocketMessage) => void;
  "room-users": (users: SocketUser[]) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_URL,
);
