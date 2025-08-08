import { AuthSignOutButton } from "@/components/AuthSignOutButton";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome {session?.user.name}</CardTitle>
              <CardDescription>{session?.user.email}</CardDescription>

              <CardAction>
                <AuthSignOutButton />
              </CardAction>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}
