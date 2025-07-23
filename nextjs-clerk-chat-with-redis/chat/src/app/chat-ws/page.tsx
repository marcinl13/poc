import "server-only";

import { FormJoinChannel } from "@/components/FormJoinChannel";
import { requireUserData } from "@/data-access-layer/require-user-data";
import { RdsCard } from "rds/molecules/Card";

export default async function Page() {
  await requireUserData();

  return (
    <main className="container mx-auto flex justify-center p-4">
      <RdsCard className="max-w-md w-full">
        <p className="mb-3 font-normal text-center text-base-content">
          Select role and room to chat
        </p>

        <FormJoinChannel />
      </RdsCard>
    </main>
  );
}
