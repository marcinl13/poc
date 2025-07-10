import { getUserDataWithRole } from "@/data-access-layer/get-user-data-with-role";
import { ChatRoomWs } from "@/components/ChatRoomWs";

type Params = Promise<{ roomId: string }>;

export default async function ChatRoomPage({ params }: { params: Params }) {
  const userDataWithRole = await getUserDataWithRole();
  const awaitParams = await params;

  return <ChatRoomWs roomId={awaitParams.roomId} userInfo={userDataWithRole} />;
}
