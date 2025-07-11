import "server-only";

import { FormJoinChannel } from "@/components/FormJoinChannel";
import { requireUserData } from "@/data-access-layer/require-user-data";

export default async function Page() {
  await requireUserData();

  return (
    <main className="container mx-auto flex justify-center p-4">
      <section className="p-4 bg-base-100 max-w-md w-full border-base-300 border text-base-content rounded-lg shadow-sm">
        <p className="mb-3 font-normal text-center text-base-content">
          Select role and room to chat
        </p>

        <FormJoinChannel />
      </section>
    </main>
  );
}
