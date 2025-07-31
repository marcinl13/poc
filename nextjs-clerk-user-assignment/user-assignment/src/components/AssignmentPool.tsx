import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { DraggableItem } from "./DraggableItem";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function AssignmentPool({
  unassignedItems,
  addMoreItems,
}: {
  unassignedItems: Item[];
  addMoreItems: () => void;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">
          Available Items ({unassignedItems.length})
        </CardTitle>

        <CardAction>
          <Button size="sm" className="cursor-pointer" onClick={addMoreItems}>
            <Plus className="w-4 h-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <SortableContext
          items={unassignedItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {unassignedItems.map((item) => (
              <DraggableItem key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>

        {unassignedItems.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            All items assigned
          </div>
        )}
      </CardContent>
    </Card>
  );
}
