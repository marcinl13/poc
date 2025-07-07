export type User = {
  id: string;
  email: string;
  role: "author" | "publisher";
};

export type UserInRoom = {
  id: string;
  socketId: string;
  user: User;
};

export type Message = {
  text: string;
  question?: string;
  questionAmount?: number;
  user: User;
};

export type RoomId = string;
