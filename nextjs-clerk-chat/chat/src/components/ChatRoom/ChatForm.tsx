import { useState } from "react";
import { RdsInput, RdsButton } from "rds/atoms";
import type { ChatMessage, ChatUser } from "@/lib/socketio/client";

type ChatFormProps = {
  userInfo: ChatUser;
  handleOnMessageSend: (msg: ChatMessage) => void;
};

export const ChatForm = ({ userInfo, handleOnMessageSend }: ChatFormProps) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: ChatMessage = {
      text: message,
      user: userInfo,
    };

    setMessage("");
    handleOnMessageSend(newMessage);
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-2">
        <RdsInput
          type="text"
          className="flex-grow"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <RdsButton onClick={sendMessage}>Send</RdsButton>
      </div>
    </section>
  );
};
