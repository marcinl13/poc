import { ENABLE_SLOT_LIMIT, MAX_ITEMS_PER_SLOT } from "@/const/const";
import {
  type DragEndEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";

export function useDndAssignment(initialItems: Item[]) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [slots, setSlots] = useState<Slot[]>([
    { id: "slot-1", name: "Slot 1", items: [] },
    { id: "slot-2", name: "Slot 2", items: [] },
  ]);
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const unassignedItems = items.filter((item) => !item.slotId);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const item = items.find((item) => item.id === active.id);
    if (item) {
      setActiveItem(item);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const activeItem = items.find((item) => item.id === active.id);
    if (!activeItem) return;

    // If dropped on a slot
    if (over.data.current?.type === "slot") {
      const targetSlot = over.data.current.slot as Slot;

      // Update items to assign to new slot
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === activeItem.id ? { ...item, slotId: targetSlot.id } : item,
        ),
      );

      // Update slots
      setSlots((prevSlots) =>
        prevSlots.map((slot) => {
          if (slot.id === targetSlot.id) {
            // Add item to target slot if not already there
            const itemExists = slot.items.some(
              (item) => item.id === activeItem.id,
            );
            if (!itemExists) {
              // Check slot limit if enabled
              if (
                ENABLE_SLOT_LIMIT &&
                slot.items.length >= MAX_ITEMS_PER_SLOT
              ) {
                return slot; // Don't add if slot is full
              }
              return {
                ...slot,
                items: [
                  ...slot.items,
                  { ...activeItem, slotId: targetSlot.id },
                ],
              };
            }
          } else {
            // Remove item from other slots
            return {
              ...slot,
              items: slot.items.filter((item) => item.id !== activeItem.id),
            };
          }
          return slot;
        }),
      );
    }
  };

  const addMoreSlots = () => {
    const currentSlotCount = slots.length;
    const newSlots: Slot[] = [
      {
        id: `slot-${currentSlotCount + 1}`,
        name: `Slot ${currentSlotCount + 1}`,
        items: [],
      },
      {
        id: `slot-${currentSlotCount + 2}`,
        name: `Slot ${currentSlotCount + 2}`,
        items: [],
      },
    ];
    setSlots((prevSlots) => [...prevSlots, ...newSlots]);
  };

  const removeTwoSlots = () => {
    if (slots.length <= 2) return;

    const slotsToRemove = slots.slice(-2);
    const itemsToUnassign: string[] = [];

    // Collect items from slots being removed
    slotsToRemove.forEach((slot) => {
      slot.items.forEach((item) => {
        itemsToUnassign.push(item.id);
      });
    });

    // Update items to remove slot assignment for items in removed slots
    setItems((prevItems) =>
      prevItems.map((item) =>
        itemsToUnassign.includes(item.id)
          ? { ...item, slotId: undefined }
          : item,
      ),
    );

    // Remove the last 2 slots
    setSlots((prevSlots) => prevSlots.slice(0, -2));
  };

  const removeItemFromSlot = (itemId: string) => {
    // Update items to remove slot assignment
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, slotId: undefined } : item,
      ),
    );

    // Update slots to remove item
    setSlots((prevSlots) =>
      prevSlots.map((slot) => ({
        ...slot,
        items: slot.items.filter((item) => item.id !== itemId),
      })),
    );
  };

  return {
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
  };
}
