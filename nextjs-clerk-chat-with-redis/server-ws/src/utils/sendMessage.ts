import type { ServerMessage, WebSocketClient } from "../types";

export function sendMessage(ws: WebSocketClient, message: ServerMessage) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}
