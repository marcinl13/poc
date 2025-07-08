import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const requireUserData = async (redirectUrl = "/chat") => {
  const user = await currentUser();

  if (!user) redirect(redirectUrl);

  return user;
};
