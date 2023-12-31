"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpCircle, CheckCircle2, Circle, Plus } from "lucide-react";
import { Todo } from "@/lib/todo_data";

export function CreateTodoButton({ status }: { status: Todo["completed"] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Plus className="h-5 w-5 cursor-pointer hover:text-blue-600 motion-safe:transition motion-reduce:transition-none" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle tw="text-xl font-semibold">Create Todo</DialogTitle>
        </DialogHeader>
        <CreateForm status={status} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createTodo } from "@/lib/actions";
import { CalendarIcon, Loader2 } from "lucide-react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import IconLabel from "../icon-label";
import clsx from "clsx";

dayjs.extend(localizedFormat);

export const TodoSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(40, {
      message: "Title must be less than 40 characters.",
    }),
  body: z.string().optional(),
  due_date: z.coerce
    .date()
    .min(new Date(), { message: "Due date cannot be in the past." }),
  completed: z.enum(["open", "in_progress", "completed"], {
    required_error: "Please select a status.",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority.",
  }),
});

interface CreateFormProps {
  status: Todo["completed"];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateForm({ status, setOpen }: CreateFormProps) {
  const [loading, setLoading] = useState(false);

  // defining the form
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      body: "",
      priority: "low",
      completed: status,
      due_date: new Date(),
    },
  });

  // submit handler
  async function onSubmit(values: z.infer<typeof TodoSchema>) {
    setLoading(true);

    const todoData = {
      ...values,
      // TODO: replace with currentUser.id
      user_id: "1",
      // TODO: parse date based on how its stored
      due_date: dayjs(values.due_date).unix(),
    };

    await createTodo(todoData);
    setLoading(false);
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* title input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className={clsx(
                    field.value.length > 29 &&
                      field.value.length <= 40 &&
                      "focus-visible:ring-orange-400",
                    field.value.length > 40 && "focus-visible:ring-red-500",
                  )}
                />
              </FormControl>
              <FormDescription className="text-xs flex justify-between">
                Name your Todo (between 2 and 40 characters).
                <span
                  className={clsx("ml-1 font-semibold", {
                    hidden: field.value.length < 30,
                    "block text-red-500": field.value.length > 40,
                  })}
                >
                  {`${field.value.length}/40`}
                </span>
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* body input */}
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Input placeholder="Body" autoComplete="off" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Add an optional description to your Todo.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* priority select */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">
                    <IconLabel icon={Circle} value="low" label="Low" />
                  </SelectItem>
                  <SelectItem value="medium">
                    <IconLabel icon={Circle} value="medium" label="Medium" />
                  </SelectItem>
                  <SelectItem value="high">
                    <IconLabel icon={Circle} value="high" label="High" />
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                Select a priority for your Todo.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* status select */}
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="open">
                    <IconLabel icon={Circle} value="open" label="Todo" />
                  </SelectItem>
                  <SelectItem value="in_progress">
                    <IconLabel
                      icon={ArrowUpCircle}
                      value="in_progress"
                      label="In Progress"
                    />
                  </SelectItem>
                  <SelectItem value="completed">
                    <IconLabel
                      icon={CheckCircle2}
                      value="completed"
                      label="Completed"
                    />
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                Select a status for your todo.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* due date picker */}
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        dayjs(field.value).format("LL")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="text-xs">
                Set a due date for your Todo.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Todo
        </Button>
      </form>
    </Form>
  );
}
