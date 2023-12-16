import { Todo } from "@/lib/todo_data";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MarkStatusButton from "./markstatusbutton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StatusComboboxPopover } from "./status-combobox";
import { PriorityComboboxPopover } from "./priority-combobox";
import PriorityLabel from "./prioritylabel";
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
              <PriorityLabel
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
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-2xl">{todo.title}</h1>
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col py-2 gap-2">
              <p>{todo.body}</p>
              <div className="flex flex-col gap-2 mt-2">
                <p className="mb-2">
                  <span className="font-semibold mr-1 text-neutral-800">
                    Due:
                  </span>
                  {dayjs.unix(todo.due_date).format("MMMM D, YYYY h:mm A")}
                </p>
                <PriorityComboboxPopover priority={todo.priority} />
                <StatusComboboxPopover status={todo.completed} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
