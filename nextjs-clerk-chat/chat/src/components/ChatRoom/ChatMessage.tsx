import type { ChatMessage } from "@/lib/socketio/client";
import type { RoleValue } from "@/types";
import { FC } from "react";

const roleColors: Record<RoleValue, string> = {
  author: "text-green-500",
  publisher: "text-blue-500",
};

const UserName: FC<Pick<ChatMessage, "user">> = ({ user }) => (
  <strong className={roleColors[user.role]}>{user.email}</strong>
);

const UserMessage: FC<Pick<ChatMessage, "text">> = ({ text }) => (
  <span>{text}</span>
);

export const Message: FC<{ message: ChatMessage }> = ({ message }) => (
  <div>
    <UserName user={message.user} />: <UserMessage text={message.text} />
  </div>
);
