"use client";

import { useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import MarkStatusButton from "./mark-status-button";
import TodoDeleteButton from "./todo-delete-button";
import StatusComboboxPopover from "./status-combobox";
import PriorityComboboxPopover from "./priority-combobox";

import { Todo } from "@/lib/todo_data";
import { editTodo } from "@/lib/actions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { AlarmClockCheck, CalendarIcon } from "lucide-react";

interface TodoCardProps {
  todo: Todo;
  key: string;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const parseTime = (time: number) => {
    dayjs.extend(relativeTime);
    return dayjs().to(dayjs.unix(time));
  };

  async function handleChange(date: Date | undefined) {
    if (!date) return;

    const timestamp = Math.floor(new Date(date).getTime() / 1000);
    const newTodo = { ...todo, due_date: timestamp };

    await editTodo(todo.todo_id, newTodo);
    setCalendarOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-between items-center min-w-[275px] my-2 px-6 py-4 border rounded-md shadow-sm hover:bg-neutral-50 hover:shadow-xl cursor-pointer motion-safe:transition motion-reduce:transition-none">
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
                <p className="text-sm font-semibold text-secondary-foreground">
                  Due
                </p>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={"w-[240px] pl-3 text-left font-normal"}
                    >
                      {dayjs(todo.due_date * 1000).format("LL")}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(todo.due_date * 1000)}
                      onSelect={handleChange}
                      disabled={(date: Date) =>
                        date < new Date(todo.due_date * 1000)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <PriorityComboboxPopover todo={todo} />
                <StatusComboboxPopover todo={todo} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <TodoDeleteButton
          id={todo.todo_id}
          setOpen={setOpen}
          loading={loading}
          setLoading={setLoading}
        />
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
