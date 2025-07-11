import type { ChatRoomId } from "chat-app";
import { rooms } from "../server";
import type { ServerMessage, WebSocketClient } from "../types";

export function broadcastToRoom(
  roomId: ChatRoomId,
  message: ServerMessage,
  excludeClient?: WebSocketClient,
) {
  const room = rooms.get(roomId);
  if (!room) return;

  const json = JSON.stringify(message);
  for (const client of room.clients) {
    if (client.readyState === WebSocket.OPEN && client !== excludeClient) {
      client.send(json);
    }
  }
}
