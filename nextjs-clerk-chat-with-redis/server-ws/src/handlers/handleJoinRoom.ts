import type { ChatRoomId, ChatUser } from "@chat/shared";
import { rooms } from "../server";
import type { WebSocketClient } from "../types";
import { broadcastToRoom } from "../utils/broadcastToRoom";
import { sendMessage } from "../utils/sendMessage";

export function handleJoinRoom(
  ws: WebSocketClient,
  roomId: ChatRoomId,
  user: ChatUser,
) {
  ws.user = user;
  ws.roomId = roomId;

  if (!rooms.has(roomId)) {
    rooms.set(roomId, { name: `Room ${roomId}`, clients: new Set() });
  }

  const room = rooms.get(roomId)!;
  room.clients.add(ws);

  sendMessage(ws, {
    type: "room-joined",
    payload: {
      roomId,
      members: [...room.clients].map((c) => c.user!),
    },
  });

  broadcastToRoom(
    roomId,
    {
      type: "user-joined",
      payload: { roomId, user },
    },
    ws,
  );
}
