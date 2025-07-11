import type { Socket } from "socket.io";

export type ChatRoomId = string;

export type ChatUser = {
  id: string;
  email: string;
  role: "author" | "publisher";
};

export type ChatMessage = {
  text: string;
  user: ChatUser;
};

export type SocketIoClient = Socket & {
  user?: ChatUser;
  roomId?: ChatRoomId;
}