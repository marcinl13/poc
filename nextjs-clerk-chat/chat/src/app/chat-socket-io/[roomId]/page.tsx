import { getUserDataWithRole } from "@/data-access-layer/get-user-data-with-role";
import { ChatRoomSocketIo } from "./ChatRoomSocketIo";

type Params = Promise<{ roomId: string }>;

export default async function ChatRoomPage({ params }: { params: Params }) {
  const userDataWithRole = await getUserDataWithRole();
  const awaitParams = await params;

  return <ChatRoomSocketIo roomId={awaitParams.roomId} userInfo={userDataWithRole} />;
}
