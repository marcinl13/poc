import "server-only";

import { COOKIE_ROLE_KEY } from "@/const/cookies";
import type { ChatRoleValue } from "@chat/shared";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserData } from "./get-user-data";

export const getUserDataWithRole = async () => {
  const userData = await getUserData();
  const cookieStore = await cookies();

  const assignedRole = cookieStore.get(COOKIE_ROLE_KEY)?.value;
  if (!assignedRole) redirect("/chat-ws");

  return {
    ...userData,
    role: assignedRole as ChatRoleValue,
  };
};
