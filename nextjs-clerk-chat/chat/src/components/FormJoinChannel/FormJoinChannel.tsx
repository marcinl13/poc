import { FormButton } from "@/components/FormButton";
import { RdsInput, RdsLabel, RdsSelect } from "rds/atoms";
import type { FC } from "react";
import { joinRoomAction } from "./joinRoomAction";

export const Chat_Roles = {
  Author: "author",
  Publisher: "publisher",
} as const;

export const FormJoinChannel: FC = () => {
  return (
    <form className="space-y-6" action={joinRoomAction}>
      <div>
        <RdsLabel htmlFor="channelId">Channel ID</RdsLabel>
        <RdsInput
          type="text"
          name="channelId"
          id="channelId"
          placeholder="room1"
          className="w-full"
          required
        />
      </div>

      <div>
        <RdsLabel htmlFor="role">Role</RdsLabel>
        <RdsSelect name="role" id="role" className="w-full" required>
          <option value="">None</option>

          {Object.entries(Chat_Roles).map(([key, value]) => (
            <option key={value} value={value}>
              {key}
            </option>
          ))}
        </RdsSelect>
      </div>

      <FormButton pendingText="Joining">Join</FormButton>
    </form>
  );
};
