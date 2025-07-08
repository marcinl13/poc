import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getUserData = async () => {
  const user = await currentUser();

  if (!user) redirect("/chat");

  return {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || "guest",
  };
};
