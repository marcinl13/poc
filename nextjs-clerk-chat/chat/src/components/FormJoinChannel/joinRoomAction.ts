"use server";

import { COOKIE_ROLE_KEY } from "@/const/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function joinRoomAction(formData: FormData) {
  const cookieStore = await cookies();

  const channelId = formData.get("channelId");
  const channelRole = formData.get("role");

  if (!channelId || !channelRole) return;

  // https://nextjs.org/docs/app/api-reference/functions/cookies
  cookieStore.set({
    name: COOKIE_ROLE_KEY,
    value: channelRole as string,
    httpOnly: false, // Set to true if you want it only accessible from the server
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect(`/chat-ws/${channelId}`);
}
