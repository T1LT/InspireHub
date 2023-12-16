"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { Todo } from "@/lib/todo_data";
import { editTodo } from "@/lib/actions";

type Priority = {
  value: "low" | "medium" | "high";
  label: "Low" | "Medium" | "High";
};

const priorities: Priority[] = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
];

export function PriorityComboboxPopover({ todo }: { todo: Todo }) {
  const priority = todo.priority;
  const [open, setOpen] = React.useState(false);
  const [selectedPriority, setSelectedPriority] =
    React.useState<Priority | null>(
      priorities.find((el) => el.value === priority) || null,
    );

  const handleSelect = async (todo: Todo, value: Priority["value"]) => {
    const newTodo = { ...todo, priority: value };
    await editTodo(todo.todo_id, newTodo);

    setSelectedPriority(
      priorities.find((priority) => priority.value === value) || null,
    );

    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedPriority ? (
              <>
                <Circle
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedPriority.value === "low" && "text-green-600",
                    selectedPriority.value === "medium" && "text-orange-500",
                    selectedPriority.value === "high" && "text-red-600",
                  )}
                />
                {selectedPriority.label}
              </>
            ) : (
              <>+ Set Priority</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {priorities.map((priority) => (
                  <CommandItem
                    key={priority.value}
                    value={priority.value}
                    onSelect={() => handleSelect(todo, priority.value)}
                    className="group"
                  >
                    <Circle
                      className={cn(
                        "mr-2 h-4 w-4 group-hover:opacity-100 motion-safe:transition motion-reduce:transition-none",
                        priority.value === selectedPriority?.value
                          ? "opacity-100"
                          : "opacity-40",
                        priority.value === "low" && "text-green-600",
                        priority.value === "medium" && "text-orange-500",
                        priority.value === "high" && "text-red-600",
                      )}
                    />
                    <span>{priority.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-sm text-muted-foreground">Priority</p>
    </div>
  );
}
