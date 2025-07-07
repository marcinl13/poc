import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { pino } from "pino";
import { pinoHttp } from "pino-http";
import { Server } from "socket.io";
import type { UserInRoom, RoomId, User, Message } from "./types";

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

const usersInRooms: Record<string, UserInRoom[]> = {};

type JoinRoomProps = { roomId: RoomId; user: User };
type LeaveRoomProps = { roomId: RoomId };
type ChatMessageProps = { roomId: RoomId; message: Message };

io.on("connection", (socket) => {
  logger.info(`New connection: ${socket.id}`);

  socket.on("join-room", ({ roomId, user }: JoinRoomProps) => {
    socket.join(roomId);

    usersInRooms[roomId] = usersInRooms[roomId] || [];
    usersInRooms[roomId].push({ id: socket.id, user, socketId: socket.id });

    io.to(roomId).emit("room-users", usersInRooms[roomId]);
    socket.to(roomId).emit("user-joined", user);

    logger.debug(`Users in room: ${roomId}`, usersInRooms[roomId]);
  });

  socket.on("leave-room", ({ roomId }: LeaveRoomProps) => {
    socket.leave(roomId);

    usersInRooms[roomId] = usersInRooms[roomId]?.filter(
      (u) => u.id !== socket.id,
    );

    io.to(roomId).emit("room-users", usersInRooms[roomId]);

    logger.debug(`Users in room: ${roomId}`, usersInRooms[roomId]);
  });

  socket.on("chat-message", ({ roomId, message }: ChatMessageProps) => {
    io.to(roomId).emit("chat-message", message);

    logger.debug("Chat message:", message);
  });

  // todo fix me
  socket.on("disconnecting", () => {
    for (const roomId of socket.rooms) {
      if (roomId !== socket.id) {
        usersInRooms[roomId] = usersInRooms[roomId]?.filter(
          (u) => u.id !== socket.id,
        );
        io.to(roomId).emit("room-users", usersInRooms[roomId]);
      }
    }
  });
});

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
