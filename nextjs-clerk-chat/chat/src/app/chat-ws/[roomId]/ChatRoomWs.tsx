"use client";

import { ChatForm } from "@/components/ChatForm";
import { ChatMembers } from "@/components/ChatMembers";
import { ChatMessages } from "@/components/ChatMessages";
import { useWsChat } from "@/hooks/useWsChat";
import type { ChatRoomId, ChatUser } from "@chat/shared";
import type { FC } from "react";

export const ChatRoomWs: FC<{
  roomId: ChatRoomId;
  userInfo: ChatUser;
}> = ({ roomId, userInfo }) => {
  const { members, messages, sendMessage } = useWsChat(roomId, userInfo);

  return (
    <>
      <ChatMembers members={members} />
      <ChatMessages messages={messages} />
      <ChatForm onSubmitMessage={sendMessage} />
    </>
  );
};
