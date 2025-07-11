import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { pino } from "pino";
import { pinoHttp } from "pino-http";
import { Server } from "socket.io";
import type {
  ChatRoomId,
  ChatUser,
  ChatMessage,
  SocketIoClient,
} from "./types";

// Initialize pino logger
const logger = pino({ level: "info" });

// Initialize HTTP logger middleware
const httpLogger = pinoHttp({ logger });

const PORT = 3006;
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  httpLogger(req, res);

  res.end();
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

export const rooms = new Map<
  ChatRoomId,
  {
    name: string;
    clients: Set<SocketIoClient>;
  }
>();

io.on("connection", (socket: SocketIoClient) => {
  logger.info(`New connection: ${socket.id}`);

  socket.on("join-room", ({ roomId, user }) => {
    socket.join(roomId);
    socket.user = user;
    socket.roomId = roomId;

    if (!rooms.has(roomId)) {
      rooms.set(roomId, { name: `Room ${roomId}`, clients: new Set() });
    }

    const room = rooms.get(roomId)!;
    room.clients.add(socket);

    const members = [...room.clients].map((c) => c.user!);
    io.to(roomId).emit("room-users", members);
    socket.to(roomId).emit("user-joined", user);

    logger.debug(`Users in room: ${roomId}`, members);
  });

  socket.on("leave-room", ({ roomId }) => {
    socket.leave(roomId);

    const room = rooms.get(roomId);
    if (!room || !socket.user) return;

    room.clients.delete(socket);

    const members = [...room.clients].map((c) => c.user!);
    io.to(roomId).emit("room-users", members);

    logger.debug(`Users in room: ${roomId}`, members);

    if (room.clients.size === 0) {
      rooms.delete(roomId);
    }
  });

  socket.on("chat-message", ({ roomId, message }) => {
    io.to(roomId).emit("chat-message", message);

    logger.debug("Chat message:", message);
  });

  // todo fix me
  socket.on("disconnecting", () => {
    if (socket.roomId && socket.user) {
      logger.info(
        { roomId: socket.roomId, userId: socket.user.id },
        "Cleaning up user on disconnect"
      );

      const room = rooms.get(socket.roomId);
      if (!room || !socket.user) return;

      room.clients.delete(socket);

      if (room.clients.size === 0) {
        rooms.delete(socket.roomId);
      }
    }
  });
});

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
