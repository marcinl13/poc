import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export function Control({
  isDisabled,
  onClickRemove,
  onClickAdd,
}: {
  isDisabled: boolean;
  onClickRemove: () => void;
  onClickAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">Assignment Slots</h2>

      <div className="flex gap-2">
        <Button
          onClick={onClickRemove}
          variant="outline"
          disabled={isDisabled}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="w-4 h-4">−</span>
          Remove 2 Slots
        </Button>

        <Button
          onClick={onClickAdd}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add 2 More Slots
        </Button>
      </div>
    </div>
  );
}
