export type RoomId = string;

export type User = {
  id: string;
  email: string;
  role: "author" | "publisher";
};

export type Message = {
  text: string;
  user: User;
};

export type WebSocketMessage =
  | {
      type: "join-room";
      payload: {
        roomId: RoomId;
        user: User;
      };
    }
  | {
      type: "leave-room";
      payload: {
        roomId: RoomId;
      };
    }
  | {
      type: "chat-message";
      payload: {
        roomId: RoomId;
        message: Message;
      };
    }
  | {
      type: "get-rooms";
      payload: {};
    };

export type ServerMessage =
  | {
      type: "room-joined";
      payload: {
        roomId: RoomId;
        members: User[];
      };
    }
  | {
      type: "room-left";
      payload: {
        roomId: RoomId;
      };
    }
  | {
      type: "user-joined";
      payload: {
        roomId: RoomId;
        user: User;
      };
    }
  | {
      type: "user-left";
      payload: {
        roomId: RoomId;
        user: User;
      };
    }
  | {
      type: "message-received";
      payload: {
        roomId: RoomId;
        message: Message;
        timestamp: string;
      };
    }
  | {
      type: "rooms-list";
      payload: {
        rooms: Array<{
          id: RoomId;
          name: string;
          memberCount: number;
        }>;
      };
    }
  | {
      type: "system";
      payload: {
        message: string;
      };
    };

export interface ClientInfo {
  ws: WebSocket;
  user: User | null;
  roomId: RoomId | null;
}

export interface Room {
  id: RoomId;
  name: string;
  memberCount: number;
}
