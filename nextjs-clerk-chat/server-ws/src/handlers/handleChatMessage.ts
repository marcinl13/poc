import { rooms } from "../server";
import type { ChatMessage, ChatRoomId } from "../types";
import { broadcastToRoom } from "../utils/broadcastToRoom";

export function handleChatMessage(roomId: ChatRoomId, message: ChatMessage) {
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
