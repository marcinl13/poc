"use client";

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
      <input
        type="text"
        placeholder="Enter message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Send
      </button>
    </form>
  );
};
