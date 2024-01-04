import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowUpWideNarrow } from "lucide-react";

interface SortTodoProps {
  sortBy: string[] | undefined;
  setSortBy: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  sortOrders: string[];
  setSortOrders: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SortTodoButton({
  sortBy,
  setSortBy,
  sortOrders,
  setSortOrders,
}: SortTodoProps) {
  const handleOrderChange = (value: string, idx: number) => {
    const newSortOrders = [...sortOrders];
    newSortOrders[idx] = value;
    setSortOrders(newSortOrders);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ArrowUpWideNarrow className="h-5 w-5 cursor-pointer hover:text-blue-600 motion-safe:transition motion-reduce:transition-none" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="w-full flex justify-between items-center">
              <h4 className="font-semibold leading-none">Sort By</h4>
              <button
                onClick={() => {
                  setSortBy([]);
                  setSortOrders(["asc", "asc", "asc"]);
                }}
                className="bg-black text-white px-2 py-1 text-xs font-medium border rounded-md hover:bg-neutral-800 hover:text-secondary transition"
              >
                Reset
              </button>
            </div>
            <ToggleGroup
              type="multiple"
              value={sortBy}
              onValueChange={(newSortBy: string[] | undefined) =>
                setSortBy(newSortBy)
              }
              asChild
            >
              <div className="grid grid-cols-4 gap-2 py-2">
                {/* DUE DATE SORTING */}
                <ToggleGroupItem value="due_date" className="col-span-2">
                  Due Date
                </ToggleGroupItem>
                <RadioGroup
                  value={sortOrders[0]}
                  onValueChange={(value) => handleOrderChange(value, 0)}
                  className="col-span-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="asc" id="date_asc" />
                    <Label htmlFor="date_asc">Ascending</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="desc" id="date_desc" />
                    <Label htmlFor="date_desc">Descending</Label>
                  </div>
                </RadioGroup>
                <Separator className="my-2 col-span-4" />

                {/* PRIORITY SORTING */}
                <ToggleGroupItem value="priority" className="col-span-2">
                  Priority
                </ToggleGroupItem>
                <RadioGroup
                  value={sortOrders[1]}
                  onValueChange={(value) => handleOrderChange(value, 1)}
                  className="col-span-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="asc" id="priority_asc" />
                    <Label htmlFor="priority_asc">Ascending</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="desc" id="priority_desc" />
                    <Label htmlFor="priority_desc">Descending</Label>
                  </div>
                </RadioGroup>
                <Separator className="my-2 col-span-4" />

                {/* ALPHABETICAL SORTING */}
                <ToggleGroupItem value="alphabetical" className="col-span-2">
                  Alphabetical
                </ToggleGroupItem>
                <RadioGroup
                  value={sortOrders[2]}
                  onValueChange={(value) => handleOrderChange(value, 2)}
                  className="col-span-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="asc" id="alphabetical_asc" />
                    <Label htmlFor="alphabetical_asc">Ascending</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="desc" id="alphabetical_desc" />
                    <Label htmlFor="alphabetical_desc">Descending</Label>
                  </div>
                </RadioGroup>
              </div>
            </ToggleGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
