import { getUserDataWithRole } from "@/data-access-layer/get-user-data-with-role";
import { ChatRoomSocketIo } from "./ChatRoomSocketIo";

type Params = Promise<{ roomId: string }>;

export default async function ChatRoomPage({ params }: { params: Params }) {
  const userDataWithRole = await getUserDataWithRole();
  const awaitParams = await params;

  return (
    <main className="container  px-4 max-w-3xl mx-auto mt-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">Room: {awaitParams.roomId}</h1>
      
      <ChatRoomSocketIo
        roomId={awaitParams.roomId}
        userInfo={userDataWithRole}
      />
    </main>
  );
}
