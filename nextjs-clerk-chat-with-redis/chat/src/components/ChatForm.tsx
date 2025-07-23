"use client";

import { RdsButton } from "rds/atoms/RdsButton";
import { RdsInput } from "rds/atoms/RdsInput";
import { type FC, useState } from "react";

export const ChatForm: FC<{ onSubmitMessage: (text: string) => void }> = ({
  onSubmitMessage,
}) => {
  const [input, setInput] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() === "") return;
    onSubmitMessage(input.trim());
    setInput("");
  }

  return (
    <form onSubmit={handleSend} className="flex gap-3">
      <RdsInput
        type="text"
        placeholder="Enter message"
        className="flex-grow"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <RdsButton type="submit" _variant="secondary">
        Send
      </RdsButton>
    </form>
  );
};
