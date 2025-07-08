import "server-only";
import { getUserData } from "./get-user-data";
import { COOKIE_ROLE_KEY } from "@/const/cookies";
import { cookies } from "next/headers";
import type { RoleValue } from "@/types";
import { redirect } from "next/navigation";

export const getUserDataWithRole = async () => {
  const userData = await getUserData();
  const cookieStore = await cookies();

  const assignedRole = cookieStore.get(COOKIE_ROLE_KEY)?.value
  if (!assignedRole) redirect("/chat");

  return {
    ...userData,
    role: assignedRole as RoleValue,
  };
};
