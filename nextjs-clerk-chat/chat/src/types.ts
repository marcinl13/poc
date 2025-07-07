export enum Role {
  Author = "author",
  Publisher = "publisher",
}

// Type with only the values of Role
export type RoleValue = `${Role}`;

export type SocketUserProfile = {
  email: string;
  role: RoleValue;
  id: string;
};

export type SocketUser = {
  id: string; // socketId
  socketId: string;
  user: SocketUserProfile;
};

export type SocketMessage = {
  text: string;
  user: SocketUserProfile;
};
