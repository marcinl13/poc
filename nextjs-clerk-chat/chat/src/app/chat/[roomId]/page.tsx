import { ChatRoom } from "@/components/ChatRoom/ChatRoom";
import { getUserDataWithRole } from "@/data-access-layer/get-user-data-with-role";

type Params = Promise<{ roomId: string }>;

export default async function ChatRoomPage({ params }: { params: Params }) {
  const userDataWithRole = await getUserDataWithRole();
  const awaitParams = await params;

  return <ChatRoom roomId={awaitParams.roomId} userInfo={userDataWithRole} />;
}
