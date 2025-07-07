import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";
import type { RoleValue } from "@/types";
import { redirect } from "next/navigation";
import { ChatRoom } from "@/components/ChatRoom/ChatRoom";

type Params = Promise<{ roomId: string }>;

export default async function ChatRoomPage({ params }: { params: Params }) {
  const user = await currentUser();
  const cookieStore = await cookies();
  const awaitParams = await params;

  const assignedRole = cookieStore.get("channelRole")?.value as
    | RoleValue
    | undefined;

  if (!user || !assignedRole) redirect("/chat");

  return (
    <ChatRoom
      roomId={awaitParams.roomId}
      userInfo={{
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || "guest",
        role: assignedRole,
      }}
    />
  );
}
