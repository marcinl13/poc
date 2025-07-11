"use client";

import type { FC } from "react";
import { useSocketIoChat } from "@/hooks/useSocketIoChat";
import type { ChatRoomId, ChatUser } from "chat-app";
import { Form } from "@/components/Form";
import { Members } from "@/components/Members";
import { Messages } from "@/components/Messages";

export const ChatRoomSocketIo: FC<{
  roomId: ChatRoomId;
  userInfo: ChatUser;
}> = ({ roomId, userInfo }) => {
  const { members, messages, sendMessage } = useSocketIoChat(roomId, userInfo);

  return (
    <main className="max-w-3xl mx-auto mt-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">Room: {roomId}</h1>

      <Members members={members} />
      <Messages messages={messages} />
      <Form onSubmitMessage={sendMessage} />
    </main>
  );
};
