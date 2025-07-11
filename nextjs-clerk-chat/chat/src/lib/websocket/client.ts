let socket: WebSocket | null = null;

export function connectToWebSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_WS_SERVER_URL!);
  }
  return socket;
}

export type ChatRoomId = string;

export type ChatUser = {
  id: string;
  email: string;
  role: "author" | "publisher";
};

export type ChatMessage = {
  text: string;
  user: ChatUser;
};

export type ServerMessage =
  | { type: "room-joined"; payload: { roomId: ChatRoomId; members: ChatUser[] } }
  | { type: "user-joined"; payload: { roomId: ChatRoomId; user: ChatUser } }
  | { type: "user-left"; payload: { roomId: ChatRoomId; user: ChatUser } }
  | {
      type: "message-received";
      payload: { roomId: ChatRoomId; message: ChatMessage; timestamp: string };
    };
