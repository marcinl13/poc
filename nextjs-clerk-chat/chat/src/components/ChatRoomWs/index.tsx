"use client";

import { useWsChat } from "@/hooks/useWsChat";
import type { SocketUserProfile } from "@/types";
import { Form } from "./Form";
import { Members } from "./Members";
import { Messages } from "./Messages";
import type { FC } from "react";

export const ChatRoomWs: FC<{
  roomId: string;
  userInfo: SocketUserProfile;
}> = ({ roomId, userInfo }) => {
  const { members, messages, sendMessage } = useWsChat(roomId, userInfo);

  return (
    <main className="max-w-3xl mx-auto mt-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">Room: {roomId}</h1>

      <Members members={members} />
      <Messages messages={messages} />
      <Form onSubmitMessage={sendMessage} />
    </main>
  );
};
