"use client";

import { Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import PriorityBadge from "./priority-label";
import { Button } from "@/components/ui/button";

interface FilterTodoProps {
  filters: string[] | undefined;
  setFilters: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export default function FilterTodoButton({
  filters,
  setFilters,
}: FilterTodoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Filter className="h-5 w-5 cursor-pointer hover:text-blue-600 motion-safe:transition motion-reduce:transition-none" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="w-full flex justify-between items-center">
              <h4 className="font-semibold leading-none">Filters</h4>
              <button
                onClick={() => setFilters([])}
                className="bg-black text-white mr-2 px-2 py-1 text-xs font-medium border rounded-md hover:bg-neutral-800 hover:text-secondary transition"
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
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-medium">Priority</h1>
                <div className="flex gap-1">
                  <ToggleGroupItem
                    value="low"
                    className="hover:bg-green-100 data-[state=on]:bg-green-200"
                  >
                    <PriorityBadge priority="low" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="medium"
                    className="hover:bg-orange-100 data-[state=on]:bg-orange-200"
                  >
                    <PriorityBadge priority="medium" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="high"
                    className="hover:bg-red-100 data-[state=on]:bg-red-200"
                  >
                    <PriorityBadge priority="high" />
                  </ToggleGroupItem>
                </div>
              </div>
            </ToggleGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
