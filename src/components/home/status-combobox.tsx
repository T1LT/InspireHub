"use client";

import * as React from "react";
import { ArrowUpCircle, CheckCircle2, Circle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Todo } from "@/lib/todo_data";
import { editTodo } from "@/lib/actions";
import IconLabel from "./icon-label";

type Status = {
  value: Todo["completed"];
  label: "Todo" | "In Progress" | "Completed";
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "open",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
  },
];

export default function StatusComboboxPopover({ todo }: { todo: Todo }) {
  const status = todo.completed;
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    statuses.find((el) => el.value === status) || null,
  );

  const handleSelect = async (todo: Todo, value: Status["value"]) => {
    const newTodo = { ...todo, completed: value };
    await editTodo(todo.todo_id, newTodo);

    setSelectedStatus(
      statuses.find((priority) => priority.value === value) || null,
    );

    setOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-semibold text-secondary-foreground">Status</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <IconLabel
                icon={selectedStatus.icon}
                value={selectedStatus.value}
                label={selectedStatus.label}
              />
            ) : (
              <>+ Set status</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={() => handleSelect(todo, status.value)}
                    className="group"
                  >
                    <IconLabel
                      icon={status.icon}
                      value={status.value}
                      check={selectedStatus?.value}
                      label={status.label}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
