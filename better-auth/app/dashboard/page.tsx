import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Welcome {session?.user.name}</CardTitle>
        </CardHeader>
      </Card>
    </main>
  );
}
