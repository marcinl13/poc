"use client";

import type { FC } from "react";
import { useSocketIoChat } from "@/hooks/useSocketIoChat";
import type { ChatRoomId, ChatUser } from "chat-app";
import { ChatForm } from "@/components/ChatForm";
import { ChatMembers } from "@/components/ChatMembers";
import { ChatMessages } from "@/components/ChatMessages";

export const ChatRoomSocketIo: FC<{
  roomId: ChatRoomId;
  userInfo: ChatUser;
}> = ({ roomId, userInfo }) => {
  const { members, messages, sendMessage } = useSocketIoChat(roomId, userInfo);

  return (
    <>
      <ChatMembers members={members} />
      <ChatMessages messages={messages} />
      <ChatForm onSubmitMessage={sendMessage} />
    </>
  );
};
