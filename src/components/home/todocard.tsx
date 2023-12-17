import { Todo } from "@/lib/todo_data";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MarkStatusButton from "./markstatusbutton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusComboboxPopover } from "./status-combobox";
import { PriorityComboboxPopover } from "./priority-combobox";
import { AlarmClockCheck } from "lucide-react";

interface TodoCardProps {
  todo: Todo;
  key: string;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const parseTime = (time: number) => {
    dayjs.extend(relativeTime);
    return dayjs().to(dayjs.unix(time));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-between items-center min-w-[275px] my-2 px-6 py-4 border rounded-md shadow-sm hover:bg-gray-50 hover:shadow-lg cursor-pointer motion-safe:transition motion-reduce:transition-none">
          <div className="flex flex-col gap-2 w-[90%]">
            <h1
              className={clsx("font-semibold text-xl truncate", {
                "line-through": todo.completed === "completed",
              })}
            >
              {todo.title}
            </h1>
            <div className="flex flex-col gap-2">
              <PriorityBadge
                priority={todo.priority}
                completed={todo.completed}
              />
              <p
                className={clsx("flex items-center", {
                  "line-through hidden": todo.completed === "completed",
                })}
              >
                <AlarmClockCheck className="mr-2 h-5 w-5" />
                {`Due ${parseTime(todo.due_date)}`}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center h-full w-[10%]">
            {todo.completed === "open" && (
              <MarkStatusButton todo={todo} markAs="completed" />
            )}
            {todo.completed === "in_progress" && (
              <MarkStatusButton todo={todo} markAs="completed" />
            )}
            {todo.completed === "completed" && (
              <MarkStatusButton todo={todo} markAs="open" />
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col space-y-1.5 text-left">
          <DialogTitle className="text-2xl">{todo.title}</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col py-2 gap-2">
              <p>{todo.body}</p>
              <div className="flex flex-col gap-2 mt-2">
                <p className="mb-2">
                  <span className="font-semibold mr-1 text-neutral-800">
                    Due:
                  </span>
                  {dayjs.unix(todo.due_date).format("MMMM D, YYYY h:mm A")}
                </p>
                <PriorityComboboxPopover todo={todo} />
                <StatusComboboxPopover todo={todo} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        {/* TODO: move this to a separate component */}
        {/* TODO: add delete action */}
        <DialogFooter className="flex flex-row sm:justify-start sm:space-x-2">
          <Button variant="destructive">Delete Todo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { capitalize } from "@/lib/utils";

function PriorityBadge({
  priority,
  completed,
}: {
  priority: "low" | "medium" | "high";
  completed?: "open" | "in_progress" | "completed";
}) {
  return (
    <p
      className={clsx(
        "w-max text-white rounded-md px-2 py-1 text-sm",
        { "bg-red-500": priority === "high" },
        { "bg-orange-500": priority === "medium" },
        { "bg-green-500": priority === "low" },
        { "line-through": completed === "completed" },
      )}
    >
      {capitalize(priority)}
    </p>
  );
}
