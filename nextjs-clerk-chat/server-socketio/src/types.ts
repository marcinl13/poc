import type { ChatRoomId, ChatUser } from "@chat/shared";
import type { Socket } from "socket.io";

export type SocketIoClient = Socket & {
  user?: ChatUser;
  roomId?: ChatRoomId;
};
