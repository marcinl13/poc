"use client";

import type { ChatMessage } from "@/lib/websocket/client";
import type { FC } from "react";

export const Messages: FC<{ messages: ChatMessage[] }> = ({ messages }) => {
  return (
    <section className="mb-6 border rounded-lg p-4 h-[300px] overflow-y-auto bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>

      {messages.length === 0 && (
        <p className="text-gray-400 italic">No messages yet.</p>
      )}

      {messages.map((msg, i) => (
        <p key={i} className="mb-2">
          <strong className="text-blue-600">{msg.user.email}:</strong>{" "}
          <span>{msg.text}</span>
        </p>
      ))}
    </section>
  );
};
