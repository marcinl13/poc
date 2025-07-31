"use client";

import { AssignmentPool } from "@/components/AssignmentPool";
import { Control } from "@/components/Control";
import { DraggableItem } from "@/components/DraggableItem";
import { DroppableSlot } from "@/components/DroppableSlot";
import { Summary } from "@/components/Summary";
import { useDndAssignment } from "@/hooks/useDndAssignment";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Page() {
  const {
    items,
    slots,
    activeItem,
    unassignedItems,
    sensors,
    handleDragStart,
    handleDragEnd,
    addMoreItems,
    addMoreSlots,
    removeTwoSlots,
    removeItemFromSlot,
  } = useDndAssignment();

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
            <AssignmentPool
              unassignedItems={unassignedItems}
              addMoreItems={addMoreItems}
            />
          </div>

          {/* Slots */}
          <div className="lg:col-span-2">
            <Control
              isDisabled={slots.length <= 2}
              onClickRemove={removeTwoSlots}
              onClickAdd={addMoreSlots}
            />

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

      <Summary items={items} unassignedItems={unassignedItems} slots={slots} />
    </div>
  );
}
