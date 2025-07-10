import { WebSocketServer } from "ws";
import { handleChatMessage } from "./handlers/handleChatMessage";
import { handleGetRooms } from "./handlers/handleGetRooms";
import { handleJoinRoom } from "./handlers/handleJoinRoom";
import { handleLeaveRoom } from "./handlers/handleLeaveRoom";
import type { RoomId, WebSocketClient, WebSocketMessage } from "./types";
import logger from "./utils/logger";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

export const rooms = new Map<
  RoomId,
  {
    name: string;
    clients: Set<WebSocketClient>;
  }
>();

// 🔌 WebSocket connection
wss.on("connection", (ws: WebSocketClient) => {
  ws.on("message", (data) => {
    logger.debug({ rawData: data.toString() }, "Received message");

    let message: WebSocketMessage;
    try {
      message = JSON.parse(data.toString());
    } catch {
      return;
    }

    switch (message.type) {
      case "join-room":
        handleJoinRoom(ws, message.payload.roomId, message.payload.user);
        break;

      case "leave-room":
        handleLeaveRoom(ws, message.payload.roomId);
        break;

      case "chat-message":
        handleChatMessage(message.payload.roomId, message.payload.message);
        break;

      case "get-rooms":
        handleGetRooms(ws);
        break;
    }

    logger.info({ type: message.type }, "Handling message type");
  });

  ws.on("close", () => {
    if (ws.roomId && ws.user) {
      logger.info(
        { roomId: ws.roomId, userId: ws.user.id },
        "Cleaning up user on disconnect",
      );

      handleLeaveRoom(ws, ws.roomId);
    }
  });
});

logger.info(`WebSocket server started on ws://localhost:${PORT}`);
