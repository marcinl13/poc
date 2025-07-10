import { rooms } from "../server";
import type { Message, RoomId } from "../types";
import { broadcastToRoom } from "../utils/broadcastToRoom";

export function handleChatMessage(roomId: RoomId, message: Message) {
  const room = rooms.get(roomId);
  if (!room) return;

  const timestamp = new Date().toISOString();

  broadcastToRoom(roomId, {
    type: "message-received",
    payload: {
      roomId,
      message,
      timestamp,
    },
  });
}
