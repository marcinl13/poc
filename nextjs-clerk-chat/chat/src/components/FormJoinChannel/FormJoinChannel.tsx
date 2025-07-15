import { FormButton } from "@/components/FormButton";
import { RdsInput, RdsLabel, RdsSelect } from "rds/atoms";
import type { FC } from "react";
import { joinRoomAction } from "./joinRoomAction";
import { ChatRole } from "@chat/shared";

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

          {Object.entries(ChatRole).map(([key, value]) => (
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
