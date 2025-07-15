import type { ChatMessage, ChatRoomId, ChatUser } from "@chat/shared";
import type { WebSocket } from "ws";

export type WebSocketClient = WebSocket & {
  isAlive: boolean;
  user?: ChatUser;
  roomId?: ChatRoomId;
};

export type WebSocketMessage =
  | {
      type: "join-room";
      payload: {
        roomId: ChatRoomId;
        user: ChatUser;
      };
    }
  | {
      type: "leave-room";
      payload: {
        roomId: ChatRoomId;
      };
    }
  | {
      type: "chat-message";
      payload: {
        roomId: ChatRoomId;
        message: ChatMessage;
      };
    }
  | {
      type: "get-rooms";
      payload: {
        rooms: Array<
          {
            id: ChatRoomId;
            name: string;
            memberCount: number;
          }[]
        >;
      };
    };

export type ServerMessage =
  | {
      type: "room-joined";
      payload: {
        roomId: ChatRoomId;
        members: ChatUser[];
      };
    }
  | {
      type: "room-left";
      payload: {
        roomId: ChatRoomId;
      };
    }
  | {
      type: "user-joined";
      payload: {
        roomId: ChatRoomId;
        user: ChatUser;
      };
    }
  | {
      type: "user-left";
      payload: {
        roomId: ChatRoomId;
        user: ChatUser;
      };
    }
  | {
      type: "message-received";
      payload: {
        roomId: ChatRoomId;
        message: ChatMessage;
        timestamp: string;
      };
    }
  | {
      type: "rooms-list";
      payload: {
        rooms: Array<{
          id: ChatRoomId;
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
