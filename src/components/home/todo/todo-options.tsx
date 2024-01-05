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
    display: `Due Date ${String.fromCharCode(8593)}`,
    label: "Due Date (Closest to Now)",
  },
  {
    value: "due_date desc",
    display: `Due Date ${String.fromCharCode(8595)}`,
    label: "Due Date (Farthest from Now)",
  },
  {
    value: "priority asc",
    display: `Priority ${String.fromCharCode(8593)}`,
    label: "Priority (Low to High)",
  },
  {
    value: "priority desc",
    display: `Priority ${String.fromCharCode(8595)}`,
    label: "Priority (High to Low)",
  },
  {
    value: "alphabetical asc",
    display: "Alphabetical",
    label: "Alphabetical (A-Z)",
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
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="w-full flex justify-between items-center">
              <h4 className="font-semibold leading-none">Filter and Sort</h4>
              <button
                onClick={() => {
                  setFilters([]);
                  setSortBy("");
                }}
                className="bg-black text-white px-2 py-1 text-xs font-medium border rounded-md hover:bg-neutral-800 hover:text-secondary transition"
              >
                Reset
              </button>
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
          <div className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {sortBy
                    ? `Sort By: ${findOption()?.display}`
                    : "Sort By: None"}
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
      </PopoverContent>
    </Popover>
  );
}
