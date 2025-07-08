import "server-only";

import { cookies } from "next/headers";
import { COOKIE_ROLE_KEY } from "@/const/cookies";
import { requireUserData } from "./require-user-data";

export const setUserRole = async (channelRole: string) => {
  const cookieStore = await cookies();
  await requireUserData();

  // https://nextjs.org/docs/app/api-reference/functions/cookies
  cookieStore.set({
    name: COOKIE_ROLE_KEY,
    value: channelRole,
    httpOnly: false, // Set to true if you want it only accessible from the server
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
};
