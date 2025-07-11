"use client";

import type { ChatMessage, ChatRoleValue } from "chat-app";
import type { FC } from "react";

const roleColors: Record<ChatRoleValue, string> = {
  author: "text-green-500",
  publisher: "text-blue-500",
};

export const Messages: FC<{ messages: ChatMessage[] }> = ({ messages }) => {
  return (
    <section className="mb-6 border rounded-lg p-4 h-[300px] overflow-y-auto bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>

      {messages.length === 0 && (
        <p className="text-gray-400 italic">No messages yet.</p>
      )}

      {messages.map((msg, i) => (
        <p key={i} className="mb-2">
          <strong className={roleColors[msg.user.role]}>{msg.user.email}:</strong>{" "}
          <span>{msg.text}</span>
        </p>
      ))}
    </section>
  );
};
