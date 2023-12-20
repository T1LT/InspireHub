"use client";

import { useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";

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

import { AlarmClockCheck, CalendarIcon, Check, X } from "lucide-react";

interface TodoCardProps {
  todo: Todo;
  key: string;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  function checkOverdue(date: number) {
    const diff = dayjs(date * 1000).diff(new Date());
    if (diff <= 0) {
      return (
        <span className="flex items-center font-semibold text-red-500">
          <AlarmClockCheck className="mr-2 h-5 w-5" />
          Overdue
        </span>
      );
    } else {
      return (
        <span className="flex items-center">
          <AlarmClockCheck className="mr-2 h-5 w-5" />
          {`Due ${dayjs(date * 1000).format("ll")}`}
        </span>
      );
    }
  }

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
        <div
          className={clsx(
            "flex justify-between items-center min-w-[275px] w-[30vw] my-2 px-6 py-4 border rounded-md shadow-sm hover:bg-neutral-50 hover:shadow-xl cursor-pointer motion-safe:transition motion-reduce:transition-none",
            {
              "bg-neutral-100 hover:bg-neutral-200/60":
                todo.completed === "completed",
            },
          )}
        >
          <div className="flex flex-col gap-2 w-[90%]">
            <h1
              className={clsx("font-semibold text-xl truncate", {
                "line-through decoration-1": todo.completed === "completed",
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
                className={clsx("flex items-center w-44", {
                  hidden: todo.completed === "completed",
                })}
              >
                {checkOverdue(todo.due_date)}
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
      <DialogContent className="focus:outline-none">
        <DialogHeader className="flex flex-col space-y-1.5 text-left">
          <DialogTitle asChild>
            <EditableTitle todo={todo} />
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col py-2">
              <EditableBody todo={todo} />
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
                      disabled={(date: Date) => date < new Date()}
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

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ClickAwayListener from "@/lib/ClickAwayListener";

const TodoTitleSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(40, {
      message: "Title must be less than 40 characters.",
    }),
});

function EditableTitle({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof TodoTitleSchema>>({
    resolver: zodResolver(TodoTitleSchema),
    defaultValues: { title: todo.title },
  });

  async function onSubmit(values: z.infer<typeof TodoTitleSchema>) {
    if (values.title !== todo.title) {
      await editTodo(todo.todo_id, { ...todo, title: values.title });
    }
    setIsEditing(false);
  }

  function closeEdit() {
    form.reset({ title: todo.title });
    setIsEditing(false);
  }

  return (
    <div className="mt-2 mr-4">
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ClickAwayListener onClickAway={closeEdit}>
                      <div className="relative">
                        <Input
                          placeholder="Title"
                          {...field}
                          autoFocus
                          className="w-full px-2 py-5 text-2xl font-semibold"
                        />
                        <div className="flex">
                          <Button
                            type="submit"
                            onClick={form.handleSubmit(onSubmit)}
                            className="p-0 w-10 absolute right-[2.65rem] top-12 shadow-xl hover:opacity-100 hover:bg-neutral-700"
                          >
                            <Check className="h-5 w-5" />
                          </Button>
                          <Button
                            type="button"
                            onClick={closeEdit}
                            className="p-0 w-10 absolute right-0 top-12 shadow-xl hover:opacity-100 hover:bg-neutral-700"
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </ClickAwayListener>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <div
          className="px-2 py-1 border border-white rounded-md hover:bg-neutral-100 hover:border-inherit transition max-w-md"
          onClick={() => setIsEditing(true)}
        >
          <h1 className="text-2xl font-semibold">{todo.title}</h1>
        </div>
      )}
    </div>
  );
}

const TodoBodySchema = z.object({
  body: z.string().optional(),
});

function EditableBody({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof TodoBodySchema>>({
    resolver: zodResolver(TodoBodySchema),
    defaultValues: { body: todo.body },
  });

  async function onSubmit(values: z.infer<typeof TodoBodySchema>) {
    if (values.body !== todo.body) {
      await editTodo(todo.todo_id, { ...todo, body: values.body });
    }
    setIsEditing(false);
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  }

  function handleMoveCursor(e: React.FocusEvent<HTMLTextAreaElement, Element>) {
    const temp = e.target.value;
    e.target.value = "";
    e.target.value = temp;
    e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
  }

  function closeEdit() {
    form.reset({ body: todo.body });
    setIsEditing(false);
  }

  return (
    <div className="mr-4">
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ClickAwayListener onClickAway={closeEdit}>
                      <div className="relative">
                        <Textarea
                          placeholder="Add a description..."
                          {...field}
                          autoFocus
                          onKeyDown={handleEnter}
                          onFocus={handleMoveCursor}
                          className="w-full px-2 resize-none"
                        />
                        <div className="flex">
                          <Button
                            type="submit"
                            onClick={form.handleSubmit(onSubmit)}
                            className="p-0 w-10 absolute right-[2.65rem] top-[5.45rem] shadow-xl hover:opacity-100 hover:bg-neutral-700"
                          >
                            <Check className="h-5 w-5" />
                          </Button>
                          <Button
                            type="button"
                            onClick={closeEdit}
                            className="p-0 w-10 absolute right-0 top-[5.45rem] shadow-xl hover:opacity-100 hover:bg-neutral-700"
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </ClickAwayListener>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <div className="flex flex-col">
          <div
            className="h-20 p-2 rounded-md overflow-y-scroll border hover:bg-neutral-100 transition"
            onClick={() => setIsEditing(true)}
          >
            <p>
              {todo.body || (
                <span className="text-neutral-400">Add a description...</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

import { capitalize } from "@/lib/utils";

function PriorityBadge({
  priority,
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
      )}
    >
      {capitalize(priority)}
    </p>
  );
}
