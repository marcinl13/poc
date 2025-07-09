import { WebSocketServer, WebSocket } from "ws";
import type {
  RoomId,
  User,
  Message,
  WebSocketMessage,
  ServerMessage,
} from "./types";

type Client = WebSocket & {
  user?: User;
  roomId?: RoomId;
};

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

const rooms = new Map<
  RoomId,
  {
    name: string;
    clients: Set<Client>;
  }
>();

// 🔁 Broadcast helper
function broadcastToRoom(
  roomId: RoomId,
  message: ServerMessage,
  excludeClient?: WebSocket,
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

// 🧠 JOIN ROOM
function handleJoinRoom(ws: Client, roomId: RoomId, user: User) {
  ws.user = user;
  ws.roomId = roomId;

  if (!rooms.has(roomId)) {
    rooms.set(roomId, { name: `Room ${roomId}`, clients: new Set() });
  }

  const room = rooms.get(roomId)!;
  room.clients.add(ws);

  // Notify the joining client
  ws.send(
    JSON.stringify({
      type: "room-joined",
      payload: {
        roomId,
        members: [...room.clients].map((c) => c.user!),
      },
    } satisfies ServerMessage),
  );

  // Notify others
  broadcastToRoom(
    roomId,
    {
      type: "user-joined",
      payload: { roomId, user },
    },
    ws,
  );
}

// 👋 LEAVE ROOM
function handleLeaveRoom(ws: Client, roomId: RoomId) {
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

  ws.send(
    JSON.stringify({
      type: "room-left",
      payload: { roomId },
    } satisfies ServerMessage),
  );

  if (room.clients.size === 0) {
    rooms.delete(roomId);
  }
}

// 💬 CHAT MESSAGE
function handleChatMessage(roomId: RoomId, message: Message) {
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

// 📋 GET ROOMS
function handleGetRooms(ws: Client) {
  const roomsList = Array.from(rooms.entries()).map(([id, room]) => ({
    id,
    name: room.name,
    memberCount: room.clients.size,
  }));

  ws.send(
    JSON.stringify({
      type: "rooms-list",
      payload: { rooms: roomsList },
    } satisfies ServerMessage),
  );
}

// 🔌 WebSocket connection
wss.on("connection", (ws: Client) => {
  ws.on("message", (data) => {
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
  });

  ws.on("close", () => {
    if (ws.roomId && ws.user) {
      const room = rooms.get(ws.roomId);
      if (room) {
        room.clients.delete(ws);

        broadcastToRoom(ws.roomId, {
          type: "user-left",
          payload: {
            roomId: ws.roomId,
            user: ws.user!,
          },
        });

        if (room.clients.size === 0) {
          rooms.delete(ws.roomId);
        }
      }
    }
  });
});

console.log(`WebSocket server started on ws://localhost:${PORT}`);
