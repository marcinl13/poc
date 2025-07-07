import { Role } from "@/types";
import { RdsLabel, RdsInput, RdsSelect } from "rds/atoms";
import { FormButton } from "@/components/FormButton";
import { joinRoomAction } from "./joinRoomAction";
import { FC } from "react";

export const FormJoinChannel: FC = () => {
  return (
    <form className="space-y-6" action={joinRoomAction}>
      <div>
        <RdsLabel htmlFor="channelId" children="Channel ID" />
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
        <RdsLabel htmlFor="role" children="Role" />
        <RdsSelect name="role" id="role" className="w-full" required>
          <option value="">None</option>

          {Object.entries(Role).map(([key, value]) => (
            <option key={value} value={value}>
              {key}
            </option>
          ))}
        </RdsSelect>
      </div>

      <FormButton pendingText="Joining" children="Join" />
    </form>
  );
};