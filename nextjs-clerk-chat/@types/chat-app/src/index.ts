export enum ChatRole {
  Author = "author",
  Publisher = "publisher",
}

// Type with only the values of Role
export type ChatRoleValue = `${ChatRole}`;

export type ChatRoomId = string;

export type ChatUser = {
  id: string;
  email: string;
  role: ChatRole;
};

export type ChatMessage = {
  text: string;
  user: ChatUser;
};
