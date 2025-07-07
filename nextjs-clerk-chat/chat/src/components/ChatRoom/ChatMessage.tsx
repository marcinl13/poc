import type { RoleValue, SocketMessage } from "@/types";
import { FC } from "react";

const roleColors: Record<RoleValue, string> = {
  author: "text-green-500",
  publisher: "text-blue-500",
};

const UserName: FC<Pick<SocketMessage, "user">> = ({ user }) => (
  <strong className={roleColors[user.role]}>{user.email}</strong>
);

const UserMessage: FC<Pick<SocketMessage, "text">> = ({ text }) => (
  <span>{text}</span>
);

export const ChatMessage: FC<{ message: SocketMessage }> = ({ message }) => (
  <div>
    <UserName user={message.user} />: <UserMessage text={message.text} />
  </div>
);
