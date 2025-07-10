let socket: WebSocket | null = null;

export function connectToWebSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_WS_SERVER_URL!);
  }
  return socket;
}

export type User = {
  id: string;
  email: string;
  role: "author" | "publisher";
};

export type Message = {
  text: string;
  user: User;
};

export type ServerMessage =
  | { type: "room-joined"; payload: { roomId: string; members: User[] } }
  | { type: "user-joined"; payload: { roomId: string; user: User } }
  | { type: "user-left"; payload: { roomId: string; user: User } }
  | {
      type: "message-received";
      payload: { roomId: string; message: Message; timestamp: string };
    };
