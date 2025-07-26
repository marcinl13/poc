"use client";

import { ChatForm } from "@/components/ChatForm";
import { ChatMembers } from "@/components/ChatMembers";
import { ChatMessages } from "@/components/ChatMessages";
import { useWsChat } from "@/hooks/useWsChat";
import type { ChatMessage, ChatRoomId, ChatUser } from "@chat/shared";
import type { FC } from "react";

export const ChatRoomWs: FC<{
  roomId: ChatRoomId;
  userInfo: ChatUser;
  cachedMessages: ChatMessage[];
}> = ({ roomId, userInfo, cachedMessages }) => {
  const { members, messages, sendMessage } = useWsChat(roomId, userInfo);

  return (
    <>
      <ChatMembers members={members} />
      <ChatMessages messages={[...cachedMessages, ...messages]} />
      <ChatForm onSubmitMessage={sendMessage} />
    </>
  );
};
