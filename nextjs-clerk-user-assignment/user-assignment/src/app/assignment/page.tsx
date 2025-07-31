"use client";

import { DraggableItem } from "@/components/DraggableItem";
import { DroppableSlot } from "@/components/DroppableSlot";
import { Summary } from "@/components/Summary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENABLE_SLOT_LIMIT, MAX_ITEMS_PER_SLOT } from "@/const/const";
import { useDndAssignment } from "@/hooks/useDndAssignment";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";

const initialItems: Item[] = [
  { id: "1", content: "Task 1" },
  { id: "2", content: "Task 2" },
  { id: "3", content: "Task 3" },
  { id: "4", content: "Task 4" },
  { id: "5", content: "Task 5" },
  { id: "6", content: "Task 6" },
  { id: "7", content: "Task 7" },
  { id: "8", content: "Task 8" },
  { id: "9", content: "Task 9" },
  { id: "10", content: "Task 10" },
];

export default function Page() {
  const {
    items,
    slots,
    activeItem,
    unassignedItems,
    sensors,
    handleDragStart,
    handleDragEnd,
    addMoreSlots,
    removeTwoSlots,
    removeItemFromSlot,
  } = useDndAssignment(initialItems);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Drag & Drop Assignment</h1>
        <p className="text-gray-600">
          Drag items from the list below to assign them to slots
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Items */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Available Items ({unassignedItems.length})
                </CardTitle>
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
          </div>

          {/* Slots */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Assignment Slots</h2>
              <div className="flex gap-2">
                <Button
                  onClick={removeTwoSlots}
                  variant="outline"
                  disabled={slots.length <= 2}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-4 h-4">−</span>
                  Remove 2 Slots
                </Button>
                <Button
                  onClick={addMoreSlots}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add 2 More Slots
                </Button>
              </div>
            </div>

            <SortableContext
              items={slots.map((slot) => slot.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slots.map((slot) => (
                  <DroppableSlot
                    key={slot.id}
                    slot={slot}
                    onRemoveItem={removeItemFromSlot}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        </div>

        <DragOverlay>
          {activeItem ? <DraggableItem item={activeItem} isOverlay /> : null}
        </DragOverlay>
      </DndContext>

      <Summary items={items} unassignedItems={unassignedItems} slots={slots}/>
    </div>
  );
}
