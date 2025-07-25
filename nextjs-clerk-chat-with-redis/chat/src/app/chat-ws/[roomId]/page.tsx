import Redis from "ioredis";
import { getUserDataWithRole } from "@/data-access-layer/get-user-data-with-role";
import { ChatRoomWs } from "./ChatRoomWs";

type Params = Promise<{ roomId: string }>;
const redis = new Redis("redis://:@localhost:6380/0");

export default async function ChatRoomPage({ params }: { params: Params }) {
  const userDataWithRole = await getUserDataWithRole();
  const awaitParams = await params;
  const redisKey = `chat:messages:${awaitParams.roomId}`;
  const messages = await redis.lrange(redisKey, 0, -1);

  return (
    <main className="container px-4 max-w-3xl mx-auto mt-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">Room: {awaitParams.roomId}</h1>

      <ChatRoomWs
        roomId={awaitParams.roomId}
        userInfo={userDataWithRole}
        cachedMessages={messages.map((m) => JSON.parse(m))}
      />
    </main>
  );
}
