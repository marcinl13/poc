"use client";

import { useWsChat } from "@/hooks/useWsChat";
import type { FC } from "react";
import type { ChatRoomId, ChatUser } from "chat-app";
import { ChatForm } from "@/components/ChatForm";
import { ChatMembers } from "@/components/ChatMembers";
import { ChatMessages } from "@/components/ChatMessages";

export const ChatRoomWs: FC<{
  roomId: ChatRoomId;
  userInfo: ChatUser;
}> = ({ roomId, userInfo }) => {
  const { members, messages, sendMessage } = useWsChat(roomId, userInfo);

  return (
    <main className="max-w-3xl mx-auto mt-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">Room: {roomId}</h1>

      <ChatMembers members={members} />
      <ChatMessages messages={messages} />
      <ChatForm onSubmitMessage={sendMessage} />
    </main>
  );
};
