import { ENABLE_SLOT_LIMIT, MAX_ITEMS_PER_SLOT } from "@/const/const";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export function Summary({
  items,
  unassignedItems,
  slots,
}: {
  items: Item[];
  unassignedItems: Item[];
  slots: Slot[];
}) {
  return (
    <Card className="bg-gray-50 gap-1">
      <CardHeader>
        <CardTitle>Assignment Summary</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-600">
        <span className="mr-4">Total Items: {items.length}</span>
        <span className="mr-4">
          Assigned: {items.filter((item) => item.slotId).length}
        </span>
        <span className="mr-4">Unassigned: {unassignedItems.length}</span>
        <span className="mr-4">Total Slots: {slots.length}</span>
        {ENABLE_SLOT_LIMIT && <span>Max per Slot: {MAX_ITEMS_PER_SLOT}</span>}
      </CardContent>
    </Card>
  );
}
