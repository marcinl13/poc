"use client";

import type { User } from "@/lib/websocket/client";
import type { FC } from "react";

export const Members: FC<{ members: User[] }> = ({ members }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        Members <span className="text-gray-500">({members.length})</span>
      </h2>
      <ul className="list-disc list-inside text-gray-700">
        {members.map((m) => (
          <li key={m.id}>
            {m.email} <span className="text-sm text-gray-400">({m.role})</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
