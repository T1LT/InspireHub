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
import { FaCircle } from "react-icons/fa";

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

export function PriorityComboboxPopover({ priority }: { priority: string }) {
  const [open, setOpen] = React.useState(false);
  const [selectedPriority, setSelectedPriority] =
    React.useState<Priority | null>(
      priorities.find((el) => el.value === priority) || null,
    );

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
                <FaCircle
                  className={cn(
                    "mr-2 h-3 w-3",
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
                    onSelect={(value: string) => {
                      // TODO: MAKE PUT CALL HERE
                      setSelectedPriority(
                        priorities.find(
                          (priority) => priority.value === value,
                        ) || null,
                      );
                      setOpen(false);
                    }}
                  >
                    <FaCircle
                      className={cn(
                        "mr-2 h-3 w-3",
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
