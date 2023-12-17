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
import { Circle } from "lucide-react";
import { Todo } from "@/lib/todo_data";
import { editTodo } from "@/lib/actions";
import IconLabel from "./icon-label";

type Priority = {
  value: Todo["priority"];
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
              <IconLabel
                icon={Circle}
                value={selectedPriority.value}
                label={selectedPriority.label}
              />
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
                    <IconLabel
                      icon={Circle}
                      value={priority.value}
                      check={selectedPriority?.value}
                      label={priority.label}
                    />
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
