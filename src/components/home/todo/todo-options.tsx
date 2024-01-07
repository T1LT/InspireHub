import { useState } from "react";
import { SlidersHorizontal, ChevronsUpDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import PriorityBadge from "./priority-label";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface TodoOptionsProps {
  filters: string[] | undefined;
  setFilters: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  sortBy: string | undefined;
  setSortBy: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const sortOptions = [
  {
    value: "due_date asc",
    label: `Due Date ${String.fromCharCode(8593)}`,
  },
  {
    value: "due_date desc",
    label: `Due Date ${String.fromCharCode(8595)}`,
  },
  {
    value: "priority asc",
    label: `Priority ${String.fromCharCode(8593)}`,
  },
  {
    value: "priority desc",
    label: `Priority ${String.fromCharCode(8595)}`,
  },
  {
    value: "alphabetical asc",
    label: "Alphabetical",
  },
];

export default function TodoOptionsButton({
  filters,
  setFilters,
  sortBy,
  setSortBy,
}: TodoOptionsProps) {
  const [open, setOpen] = useState(false);
  const findOption = () =>
    sortOptions.find((sortOption) => sortOption.value === sortBy);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SlidersHorizontal className="h-4 w-4 cursor-pointer hover:text-blue-600 motion-safe:transition motion-reduce:transition-none" />
      </PopoverTrigger>
      <PopoverContent className="w-80 flex flex-col gap-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="w-full flex justify-between items-center">
              <h4 className="text-lg font-semibold leading-none mb-2">
                Filter & Sort
              </h4>
            </div>
            <ToggleGroup
              type="multiple"
              value={filters}
              onValueChange={(newFilters: string[] | undefined) =>
                setFilters(newFilters)
              }
              asChild
            >
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-medium">Priority</h1>
                <div className="flex gap-1">
                  <ToggleGroupItem
                    value="low"
                    className="px-1.5 hover:bg-green-100 data-[state=on]:bg-green-200"
                  >
                    <PriorityBadge priority="low" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="medium"
                    className="px-1.5 hover:bg-orange-100 data-[state=on]:bg-orange-200"
                  >
                    <PriorityBadge priority="medium" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="high"
                    className="px-1.5 hover:bg-red-100 data-[state=on]:bg-red-200"
                  >
                    <PriorityBadge priority="high" />
                  </ToggleGroupItem>
                </div>
              </div>
            </ToggleGroup>
          </div>
          <div className="w-full flex justify-center">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {sortBy ? `Sort By: ${findOption()?.label}` : "Sort By: None"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandGroup>
                    {sortOptions.map((sortOption) => (
                      <CommandItem
                        key={sortOption.value}
                        value={sortOption.value}
                        onSelect={(currentValue) => {
                          setSortBy(
                            currentValue === sortBy ? "" : currentValue,
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            sortBy === sortOption.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {sortOption.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <button
          onClick={() => {
            setFilters([]);
            setSortBy("");
          }}
          className="w-full bg-red-500 text-white px-2 py-2 text-sm font-medium border-red-500 rounded-md hover:bg-red-400 hover:text-secondary transition"
        >
          Reset Filters
        </button>
      </PopoverContent>
    </Popover>
  );
}
