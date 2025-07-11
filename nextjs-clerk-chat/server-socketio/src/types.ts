export type RoomId = string;

export type User = {
  id: string;
  email: string;
  role: "author" | "publisher";
};

export type Message = {
  text: string;
  user: User;
};

export type UserInRoom = {
  id: string;
  socketId: string;
  user: User;
};
