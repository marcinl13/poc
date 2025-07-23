import type { ChatRoomId } from "@chat/shared";
import { rooms } from "../server";
import type { WebSocketClient } from "../types";
import { broadcastToRoom } from "../utils/broadcastToRoom";
import { sendMessage } from "../utils/sendMessage";

export function handleLeaveRoom(ws: WebSocketClient, roomId: ChatRoomId) {
  const room = rooms.get(roomId);
  if (!room || !ws.user) return;

  room.clients.delete(ws);

  broadcastToRoom(roomId, {
    type: "user-left",
    payload: {
      roomId,
      user: ws.user!,
    },
  });

  sendMessage(ws, {
    type: "room-left",
    payload: {
      roomId,
    },
  });

  if (room.clients.size === 0) {
    rooms.delete(roomId);
  }
}
