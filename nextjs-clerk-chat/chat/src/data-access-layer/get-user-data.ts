import "server-only";

import { requireUserData } from "./require-user-data";

export const getUserData = async () => {
  const user = await requireUserData();

  return {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || "guest",
  };
};
