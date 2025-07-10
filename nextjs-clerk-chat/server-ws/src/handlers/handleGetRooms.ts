import { rooms } from "../server";
import type { WebSocketClient } from "../types";
import { sendMessage } from "../utils/sendMessage";

export function handleGetRooms(ws: WebSocketClient) {
  const roomsList = Array.from(rooms.entries()).map(([id, room]) => ({
    id,
    name: room.name,
    memberCount: room.clients.size,
  }));

  sendMessage(ws, {
    type: "rooms-list",
    payload: {
      rooms: roomsList,
    },
  });
}
